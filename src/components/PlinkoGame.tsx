import { useState, useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";
import {
  GameState,
  GAME_CONFIG,
  BUCKETS,
  BucketConfig,
} from "../config/gameConfig";
import {
  createPhysicsWorld,
  createCork,
  removeCork,
} from "../utils/physicsEngine";
import {
  findPathToBucket,
  calculateGuidanceForce,
} from "../utils/pathCalculator";
import { fetchGameResult } from "../services/gameApi";
import {
  getSessionId,
  initializePlayerStats,
  saveGameResult,
  updatePlayerStats,
  getPlayerStats,
} from "../services/supabaseService";
import { getBucketBoundaries } from "../utils/pegLayout";
import { clampToTriangleBoundary } from "../utils/boundaryChecker";
import { GameBoard } from "./GameBoard";
import { PlayButton } from "./PlayButton";
import { WinCelebration } from "./WinCelebration";
import CorkOpener from "./CorkOpener";
import BonusBanner from "./BonusBanner";
import BeerOpenAnim from "./BeerOpenAnim";

export function PlinkoGame() {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [turns, setTurns] = useState(GAME_CONFIG.defaultTurns);
  const [startAnimation, setStartAnimation] = useState(false);
  const [corkPosition, setCorkPosition] = useState<{
    x: number;
    y: number;
    rotation: number;
  } | null>(null);
  const [winningBucket, setWinningBucket] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastResult, setLastResult] = useState<{
    multiplier: string;
    multiplierValue: number;
  } | null>(null);
  const [lastResultBucket, setLastResultBucket] = useState<BucketConfig>();

  const physicsWorldRef = useRef<ReturnType<typeof createPhysicsWorld> | null>(
    null,
  );
  const engineIntervalRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dropStartTimeRef = useRef<number>(0);
  const targetBucketRef = useRef<number>(0);
  const sessionIdRef = useRef<string>("");
  const corkBodyRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    sessionIdRef.current = getSessionId();
    initializePlayerStats(sessionIdRef.current);

    getPlayerStats(sessionIdRef.current).then((stats) => {
      if (stats) {
        setTurns(stats.total_turns);
      }
    });

    physicsWorldRef.current = createPhysicsWorld();

    return () => {
      if (engineIntervalRef.current) {
        clearInterval(engineIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const renderLoop = () => {
      if (corkBodyRef.current) {
        setCorkPosition({
          x: corkBodyRef.current.position.x,
          y: corkBodyRef.current.position.y,
          rotation: corkBodyRef.current.angle,
        });
      }
      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    if (gameState === GameState.DROPPING && corkBodyRef.current) {
      renderLoop();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState]);

  const startPhysicsEngine = useCallback(() => {
    if (!physicsWorldRef.current || engineIntervalRef.current) return;

    dropStartTimeRef.current = Date.now();

    engineIntervalRef.current = window.setInterval(() => {
      if (physicsWorldRef.current && corkBodyRef.current) {
        const elapsedTime = Date.now() - dropStartTimeRef.current;

        const guidanceForce = calculateGuidanceForce(
          corkBodyRef.current,
          targetBucketRef.current,
          elapsedTime,
        );

        Matter.Body.applyForce(
          corkBodyRef.current,
          corkBodyRef.current.position,
          guidanceForce,
        );

        const wasClamped = clampToTriangleBoundary(corkBodyRef.current, 0.7);
        if (wasClamped) {
          console.log(
            "Cork clamped back to triangle boundary at Y:",
            corkBodyRef.current.position.y,
          );
        }

        Matter.Engine.update(physicsWorldRef.current.engine, 1000 / 60);

        if (
          corkBodyRef.current.position.y >=
          GAME_CONFIG.canvas.boardBottom - 35 // Cork last position adjustment
        ) {
          stopPhysicsEngine();
          setTimeout(() => {
            handleCorkLanded();
          }, 500);
        }
      }
    }, 1000 / 60);
  }, []);

  const stopPhysicsEngine = useCallback(() => {
    if (engineIntervalRef.current) {
      clearInterval(engineIntervalRef.current);
      engineIntervalRef.current = null;
    }
  }, []);

  const detectBucketLanded = useCallback((corkX: number): number => {
    const bucketBoundaries = getBucketBoundaries();

    for (let i = 0; i < bucketBoundaries.length; i++) {
      if (
        corkX >= bucketBoundaries[i].left &&
        corkX <= bucketBoundaries[i].right
      ) {
        return i;
      }
    }

    // If not in any bucket, find the closest one
    let closestBucket = 0;
    let minDistance = Math.abs(corkX - bucketBoundaries[0].center);

    for (let i = 1; i < bucketBoundaries.length; i++) {
      const distance = Math.abs(corkX - bucketBoundaries[i].center);
      if (distance < minDistance) {
        minDistance = distance;
        closestBucket = i;
      }
    }

    return closestBucket;
  }, []);

  const handleCorkLanded = useCallback(async () => {
    if (!physicsWorldRef.current || !corkBodyRef.current) return;

    const corkX = corkBodyRef.current.position.x;
    const actualBucketIndex = detectBucketLanded(corkX);

    removeCork(physicsWorldRef.current.world, corkBodyRef.current);
    corkBodyRef.current = null;
    setCorkPosition(null);
    setWinningBucket(actualBucketIndex);

    setGameState(GameState.LANDED);

    const actualBucket = BUCKETS[actualBucketIndex];
    setLastResultBucket(actualBucket);
    setLastResult({
      multiplier: actualBucket.multiplier,
      multiplierValue: actualBucket.multiplierValue,
    });

    console.log({
      multiplier: actualBucket.multiplier,
      multiplierValue: actualBucket.multiplierValue,
    });

    await saveGameResult({
      bucket_index: actualBucketIndex,
      multiplier: actualBucket.multiplier,
      multiplier_value: actualBucket.multiplierValue,
      session_id: sessionIdRef.current,
    });

    const newTurns = turns - 1;
    await updatePlayerStats(sessionIdRef.current, actualBucketIndex, newTurns);

    setTimeout(() => {
      setShowCelebration(true);
      setGameState(GameState.CELEBRATING);
    }, 300);
  }, [turns, detectBucketLanded]);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handlePlay = async () => {
    if (gameState !== GameState.IDLE || turns <= 0 || !physicsWorldRef.current)
      return;

    try {
      // 1️⃣ Start animation
      setStartAnimation(true);

      // 2️⃣ Wait for animation to play
      await delay(2000);

      // 3️⃣ Stop animation (optional)
      setStartAnimation(false);

      const result = await fetchGameResult();
      targetBucketRef.current = result.bucketIndex;

      const pathData = findPathToBucket(result.bucketIndex);

      if (!pathData) {
        console.error("Could not find path to bucket");
        setGameState(GameState.IDLE);
        return;
      }

      setGameState(GameState.DROPPING);
      setTurns((prev) => prev - 1);

      const { dispenser } = GAME_CONFIG;
      const newCork = createCork(
        dispenser.x,
        dispenser.y,
        physicsWorldRef.current.world,
      );

      Matter.Body.setVelocity(newCork, pathData.initialVelocity);
      corkBodyRef.current = newCork;

      startPhysicsEngine();
    } catch (error) {
      console.error("Error during play:", error);
      setGameState(GameState.IDLE);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    setWinningBucket(null);
    setGameState(GameState.IDLE);
  };

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-start py-8 px-4">
      <div className="relative">
        <CorkOpener />
        <BonusBanner />
        <BeerOpenAnim isWinning={startAnimation} />
        <GameBoard corkPosition={corkPosition} winningBucket={winningBucket} />

        {lastResult && (
          <WinCelebration
            multiplier={lastResult.multiplier}
            multiplierValue={lastResult.multiplierValue}
            show={showCelebration}
            onClose={handleCelebrationClose}
            lastResultBucket={
              lastResultBucket ?? ([0] as unknown as BucketConfig)
            }
          />
        )}
      </div>

      <PlayButton
        onClick={handlePlay}
        disabled={gameState !== GameState.IDLE || turns <= 0}
        isPlaying={gameState === GameState.DROPPING}
      />
    </div>
  );
}

import Matter from 'matter-js';
import { GAME_CONFIG } from '../config/gameConfig';
import { createPhysicsWorld, createCork, removeCork } from './physicsEngine';
import { getBucketBoundaries } from './pegLayout';

export interface PathData {
  initialVelocity: { x: number; y: number };
  guidanceForces: Array<{ time: number; force: { x: number; y: number } }>;
  targetBucket: number;
}

function simulatePhysics(
  initialX: number,
  initialY: number,
  velocityX: number,
  velocityY: number,
  maxSteps = 500
): { landed: boolean; bucketIndex: number; finalX: number } {
  const tempWorld = createPhysicsWorld();
  const cork = createCork(initialX, initialY, tempWorld.world);

  Matter.Body.setVelocity(cork, { x: velocityX, y: velocityY });

  let landed = false;
  let bucketIndex = -1;
  let finalX = 0;
  const bucketBoundaries = getBucketBoundaries();
  const targetY = GAME_CONFIG.canvas.boardBottom - 80;

  for (let step = 0; step < maxSteps; step++) {
    Matter.Engine.update(tempWorld.engine, 1000 / 60);

    if (cork.position.y >= targetY && !landed) {
      landed = true;
      finalX = cork.position.x;

      for (let i = 0; i < bucketBoundaries.length; i++) {
        if (finalX >= bucketBoundaries[i].left && finalX <= bucketBoundaries[i].right) {
          bucketIndex = i;
          break;
        }
      }
      break;
    }

    if (cork.position.y > GAME_CONFIG.canvas.boardBottom + 100) {
      break;
    }
  }

  removeCork(tempWorld.world, cork);

  return { landed, bucketIndex, finalX };
}

export function findPathToBucket(targetBucket: number, maxAttempts = 100): PathData | null {
  const { dispenser } = GAME_CONFIG;
  const bucketBoundaries = getBucketBoundaries();
  const targetCenter = bucketBoundaries[targetBucket].center;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const randomOffsetX = (Math.random() - 0.5) * 20;
    const velocityX = (Math.random() - 0.5) * 1.5 + (targetCenter - dispenser.x) * 0.004;
    const velocityY = 0.6 + Math.random() * 0.3;

    const result = simulatePhysics(
      dispenser.x + randomOffsetX,
      dispenser.y,
      velocityX,
      velocityY
    );

    if (result.landed && result.bucketIndex === targetBucket) {
      return {
        initialVelocity: { x: velocityX, y: velocityY },
        guidanceForces: [],
        targetBucket,
      };
    }
  }

  const biasedVelocityX = (targetCenter - dispenser.x) * 0.006;
  const biasedVelocityY = 0.8;

  return {
    initialVelocity: { x: biasedVelocityX, y: biasedVelocityY },
    guidanceForces: [
      { time: 100, force: { x: (targetCenter - dispenser.x) * 0.000008, y: 0 } },
      { time: 200, force: { x: (targetCenter - dispenser.x) * 0.000008, y: 0 } },
      { time: 300, force: { x: (targetCenter - dispenser.x) * 0.000008, y: 0 } },
    ],
    targetBucket,
  };
}

export function calculateGuidanceForce(
  cork: Matter.Body,
  targetBucket: number,
  elapsedTime: number
): { x: number; y: number } {
  const bucketBoundaries = getBucketBoundaries();
  const targetCenter = bucketBoundaries[targetBucket].center;
  const deltaX = targetCenter - cork.position.x;

  const forceMultiplier = 0.000012;
  const maxForce = 0.0008;

  let forceX = deltaX * forceMultiplier;
  forceX = Math.max(-maxForce, Math.min(maxForce, forceX));

  if (elapsedTime > 600) {
    forceX *= 0.5;
  }

  if (elapsedTime < 150) {
    forceX *= 0.15;
  }

  return { x: forceX, y: 0 };
}

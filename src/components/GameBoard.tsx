import { useMemo } from "react";
import { GAME_CONFIG, BUCKETS } from "../config/gameConfig";
import { calculatePegPositions, getBucketBoundaries } from "../utils/pegLayout";
import { Peg } from "./Peg";
import { Cup } from "./Cup";
import { Cork } from "./Cork";

interface GameBoardProps {
  corkPosition: { x: number; y: number; rotation: number } | null;
  winningBucket?: number | null;
}

export function GameBoard({
  corkPosition,
  winningBucket = null,
}: GameBoardProps) {
  const pegPositions = useMemo(() => calculatePegPositions(), []);
  const bucketBoundaries = useMemo(() => getBucketBoundaries(), []);

  const bucketY = GAME_CONFIG.bucket.topPosition;

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        width: GAME_CONFIG.canvas.width,
        height: GAME_CONFIG.canvas.height,
        backgroundImage: "url(/main_board.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {pegPositions.map((peg, index) => (
        <Peg key={`peg-${index}`} x={peg.x} y={peg.y} active={peg.active} />
      ))}

      {BUCKETS.map((bucket, index) => {
        return (
          <Cup
            key={`cup-${index}`}
            bucket={bucket}
            x={bucketBoundaries[index].left}
            y={bucketY}
            isWinning={winningBucket === index}
            winningBucket={winningBucket}
          />
        );
      })}

      {corkPosition && (
        <Cork
          x={corkPosition.x}
          y={corkPosition.y}
          rotation={corkPosition.rotation}
        />
      )}
    </div>
  );
}

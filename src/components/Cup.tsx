import { memo } from "react";
import { BucketConfig } from "../config/gameConfig";
import CupBadge from "./CupBadge";

interface CupProps {
  bucket: BucketConfig;
  x: number;
  y: number;
  isWinning?: boolean;
  winningBucket: number | null;
}

export const Cup = memo(
  ({ bucket, x, y, isWinning = false, winningBucket }: CupProps) => {
    return (
      <div
        className="absolute pointer-events-none z-30"
        style={{
          left: x,
          top: y,
          width: "24px",
          height: "42px",
        }}
      >
        <div className="relative w-full h-full z-10">
          <img
            src="/cup.png"
            alt="Cup"
            className={`w-full h-full object-contain transition-all duration-300 ${
              isWinning ? "brightness-200 drop-shadow-lg" : ""
            }`}
            style={{
              filter: isWinning
                ? `drop-shadow(0 0 8px ${bucket.strokeColor})`
                : "none",
            }}
            draggable={false}
          />

          {isWinning && (
            <img
              src="/cork.png"
              alt="Cork"
              className="w-[20px] h-[20px] object-contain z-10 absolute mix-blend-overlay"
              style={{
                top: `${bucket.corkTop}px`,
                left: `${bucket.corkLeft}px`,
              }}
              draggable={false}
            />
          )}

          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-30">
            <CupBadge
              isWinning={isWinning}
              text={bucket.multiplier}
              textColor={bucket.color}
              mainBgColor={bucket.bgColor}
              bgImage={bucket.bgImage}
              strokeColor={bucket.strokeColor}
              hasResult={winningBucket !== null}
              animationBgColor={bucket.animationBgColor}
            />
          </div>
        </div>
      </div>
    );
  },
);

Cup.displayName = "Cup";

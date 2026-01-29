import { memo } from "react";

interface CorkProps {
  x: number;
  y: number;
  rotation: number;
}

export const Cork = memo(({ x, y, rotation }: CorkProps) => {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) rotate(${rotation}rad)`,
        width: "16px",
        height: "16px",
        willChange: "transform",
      }}
    >
      <img
        src="/cork.png"
        alt="Cork"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </div>
  );
});

Cork.displayName = "Cork";

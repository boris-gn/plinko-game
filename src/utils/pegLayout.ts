import { GAME_CONFIG, PegPosition } from "../config/gameConfig";

export function calculatePegPositions(): PegPosition[] {
  const pegs: PegPosition[] = [];
  const { boardTop } = GAME_CONFIG.canvas;
  const { rows, cols, verticalGap, horizontalGap, triangleStartPegs } =
    GAME_CONFIG.peg;

  const startY = boardTop + 70; //50;
  const baseStartX = 30;

  for (let row = 0; row < rows; row++) {
    const isEvenRow = row % 2 === 1;
    const numPegsInRow = isEvenRow ? cols - 1 : cols;
    const xOffset = isEvenRow ? horizontalGap / 2 : 0;

    const numActivePegs = triangleStartPegs + row;
    const activeStartCol = Math.floor((numPegsInRow - numActivePegs) / 2);
    const activeEndCol = activeStartCol + numActivePegs;

    for (let col = 0; col < numPegsInRow; col++) {
      const x = baseStartX + xOffset + col * horizontalGap;
      const y = startY + row * verticalGap;
      const active = col >= activeStartCol && col < activeEndCol;
      pegs.push({ x, y, active });
    }
  }

  return pegs;
}

export function getBucketBoundaries(): Array<{
  left: number;
  right: number;
  center: number;
}> {
  const { count, width, gap, startX } = GAME_CONFIG.bucket;

  const buckets: Array<{ left: number; right: number; center: number }> = [];

  for (let i = 0; i < count; i++) {
    const left = startX + i * (width + gap);
    const right = left + width;
    const center = (left + right) / 2;
    buckets.push({ left, right, center });
  }

  return buckets;
}

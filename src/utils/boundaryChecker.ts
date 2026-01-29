import Matter from 'matter-js';
import { PegPosition } from '../config/gameConfig';

export interface TriangleBoundary {
  minX: number;
  maxX: number;
}

export interface BoundaryConfig {
  topLeftPeg: PegPosition;
  topRightPeg: PegPosition;
  bottomLeftPeg: PegPosition;
  bottomRightPeg: PegPosition;
}

let boundaryConfig: BoundaryConfig | null = null;

export function initializeBoundaryConfig(config: BoundaryConfig) {
  boundaryConfig = config;
}

export function calculateTriangleBoundary(yPosition: number): TriangleBoundary {
  if (!boundaryConfig) {
    throw new Error('Boundary config not initialized');
  }

  const { topLeftPeg, topRightPeg, bottomLeftPeg, bottomRightPeg } = boundaryConfig;

  const topY = topLeftPeg.y;
  const bottomY = bottomLeftPeg.y;

  const t = Math.max(0, Math.min(1, (yPosition - topY) / (bottomY - topY)));

  const minX = topLeftPeg.x + t * (bottomLeftPeg.x - topLeftPeg.x);
  const maxX = topRightPeg.x + t * (bottomRightPeg.x - topRightPeg.x);

  return { minX, maxX };
}

export function isOutsideTriangle(x: number, y: number): boolean {
  if (!boundaryConfig) {
    return false;
  }

  const boundary = calculateTriangleBoundary(y);
  return x < boundary.minX || x > boundary.maxX;
}

export function clampToTriangleBoundary(
  cork: Matter.Body,
  dampingFactor: number = 0.7
): boolean {
  if (!boundaryConfig) {
    return false;
  }

  const { x, y } = cork.position;
  const boundary = calculateTriangleBoundary(y);

  let clamped = false;

  if (x < boundary.minX) {
    Matter.Body.setPosition(cork, { x: boundary.minX, y });
    Matter.Body.setVelocity(cork, {
      x: Math.abs(cork.velocity.x) * dampingFactor,
      y: cork.velocity.y,
    });
    clamped = true;
  } else if (x > boundary.maxX) {
    Matter.Body.setPosition(cork, { x: boundary.maxX, y });
    Matter.Body.setVelocity(cork, {
      x: -Math.abs(cork.velocity.x) * dampingFactor,
      y: cork.velocity.y,
    });
    clamped = true;
  }

  return clamped;
}

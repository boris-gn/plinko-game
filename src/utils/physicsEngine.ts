import Matter from 'matter-js';
import { GAME_CONFIG } from '../config/gameConfig';
import { calculatePegPositions, getBucketBoundaries } from './pegLayout';
import { initializeBoundaryConfig } from './boundaryChecker';

export interface PhysicsWorld {
  engine: Matter.Engine;
  world: Matter.World;
  cork: Matter.Body | null;
  pegs: Matter.Body[];
  walls: Matter.Body[];
  bucketSensors: Matter.Body[];
}

export function createPhysicsWorld(): PhysicsWorld {
  const engine = Matter.Engine.create({
    gravity: { x: 0, y: GAME_CONFIG.physics.gravity },
  });

  const world = engine.world;
  const pegPositions = calculatePegPositions();
  const bucketBoundaries = getBucketBoundaries();

  const activePegs = pegPositions.filter((pos) => pos.active);
  const pegs = activePegs.map((pos) =>
    Matter.Bodies.circle(pos.x, pos.y, GAME_CONFIG.peg.radius, {
      isStatic: true,
      restitution: GAME_CONFIG.physics.restitution,
      friction: GAME_CONFIG.physics.friction,
      label: 'peg',
    })
  );

  const { boardLeft, boardRight, boardTop } = GAME_CONFIG.canvas;
  const cupHeight = 38;
  const cupY = GAME_CONFIG.canvas.height - cupHeight - 8;
  const floorY = cupY + cupHeight;

  const firstRowActivePegs = GAME_CONFIG.peg.triangleStartPegs;
  const lastRowActivePegs = GAME_CONFIG.peg.triangleStartPegs + GAME_CONFIG.peg.rows - 1;

  const topLeftPeg = activePegs[0];
  const topRightPeg = activePegs[firstRowActivePegs - 1];

  let currentIndex = 0;
  for (let row = 0; row < GAME_CONFIG.peg.rows - 1; row++) {
    const numActivePegs = GAME_CONFIG.peg.triangleStartPegs + row;
    currentIndex += numActivePegs;
  }

  const bottomLeftPeg = activePegs[currentIndex];
  const bottomRightPeg = activePegs[currentIndex + lastRowActivePegs - 1];

  const leftDiagonalAngle = Math.atan2(bottomLeftPeg.y - topLeftPeg.y, bottomLeftPeg.x - topLeftPeg.x);
  const rightDiagonalAngle = Math.atan2(bottomRightPeg.y - topRightPeg.y, bottomRightPeg.x - topRightPeg.x);

  const leftDiagonalLength = Math.sqrt(
    Math.pow(bottomLeftPeg.x - topLeftPeg.x, 2) + Math.pow(bottomLeftPeg.y - topLeftPeg.y, 2)
  );
  const rightDiagonalLength = Math.sqrt(
    Math.pow(bottomRightPeg.x - topRightPeg.x, 2) + Math.pow(bottomRightPeg.y - topRightPeg.y, 2)
  );

  const wallThickness = 20;
  const wallOffset = 12;

  const leftWallCenterX = (topLeftPeg.x + bottomLeftPeg.x) / 2;
  const leftWallCenterY = (topLeftPeg.y + bottomLeftPeg.y) / 2;
  const leftOffsetX = Math.cos(leftDiagonalAngle + Math.PI / 2) * wallOffset;
  const leftOffsetY = Math.sin(leftDiagonalAngle + Math.PI / 2) * wallOffset;

  const rightWallCenterX = (topRightPeg.x + bottomRightPeg.x) / 2;
  const rightWallCenterY = (topRightPeg.y + bottomRightPeg.y) / 2;
  const rightOffsetX = Math.cos(rightDiagonalAngle - Math.PI / 2) * wallOffset;
  const rightOffsetY = Math.sin(rightDiagonalAngle - Math.PI / 2) * wallOffset;

  const leftDiagonalWall = Matter.Bodies.rectangle(
    leftWallCenterX + leftOffsetX,
    leftWallCenterY + leftOffsetY,
    leftDiagonalLength + 40,
    wallThickness,
    {
      isStatic: true,
      angle: leftDiagonalAngle,
      label: 'diagonal-wall-left',
      restitution: 0.65,
      friction: 0.1,
      collisionFilter: {
        category: 0x0004,
        mask: 0xFFFF,
        group: -1,
      },
      render: { visible: false },
    }
  );

  const rightDiagonalWall = Matter.Bodies.rectangle(
    rightWallCenterX + rightOffsetX,
    rightWallCenterY + rightOffsetY,
    rightDiagonalLength + 40,
    wallThickness,
    {
      isStatic: true,
      angle: rightDiagonalAngle,
      label: 'diagonal-wall-right',
      restitution: 0.65,
      friction: 0.1,
      collisionFilter: {
        category: 0x0004,
        mask: 0xFFFF,
        group: -1,
      },
      render: { visible: false },
    }
  );

  const wallThickness2 = 40;
  const walls = [
    Matter.Bodies.rectangle(boardLeft - wallThickness2 / 2, (boardTop + floorY) / 2, wallThickness2, floorY - boardTop + 100, {
      isStatic: true,
      label: 'wall',
      restitution: 0.8,
    }),
    Matter.Bodies.rectangle(boardRight + wallThickness2 / 2, (boardTop + floorY) / 2, wallThickness2, floorY - boardTop + 100, {
      isStatic: true,
      label: 'wall',
      restitution: 0.8,
    }),
    Matter.Bodies.rectangle((boardLeft + boardRight) / 2, floorY, boardRight - boardLeft, 20, {
      isStatic: true,
      label: 'floor',
    }),
    leftDiagonalWall,
    rightDiagonalWall,
  ];

  const bucketSensors = bucketBoundaries.map((bucket, index) =>
    Matter.Bodies.rectangle(
      bucket.center,
      cupY + cupHeight / 2,
      GAME_CONFIG.bucket.width,
      cupHeight,
      {
        isStatic: true,
        isSensor: true,
        label: `bucket-${index}`,
      }
    )
  );

  Matter.World.add(world, [...pegs, ...walls, ...bucketSensors]);

  initializeBoundaryConfig({
    topLeftPeg,
    topRightPeg,
    bottomLeftPeg,
    bottomRightPeg,
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      const cork = bodyA.label === 'cork' ? bodyA : bodyB.label === 'cork' ? bodyB : null;
      const wall =
        bodyA.label?.startsWith('diagonal-wall')
          ? bodyA
          : bodyB.label?.startsWith('diagonal-wall')
          ? bodyB
          : null;

      if (cork && wall) {
        Matter.Body.setVelocity(cork, {
          x: cork.velocity.x * 0.7,
          y: cork.velocity.y,
        });
      }
    });
  });

  return {
    engine,
    world,
    cork: null,
    pegs,
    walls,
    bucketSensors,
  };
}

export function createCork(x: number, y: number, world: Matter.World): Matter.Body {
  const cork = Matter.Bodies.circle(x, y, GAME_CONFIG.cork.radius, {
    density: GAME_CONFIG.cork.density,
    restitution: GAME_CONFIG.cork.restitution,
    friction: GAME_CONFIG.cork.friction,
    frictionAir: GAME_CONFIG.physics.airFriction,
    label: 'cork',
    collisionFilter: {
      category: 0x0001,
      mask: 0xFFFF,
    },
  });

  Matter.World.add(world, cork);
  return cork;
}

export function removeCork(world: Matter.World, cork: Matter.Body) {
  Matter.World.remove(world, cork);
}

export function applyCorkForce(cork: Matter.Body, force: { x: number; y: number }) {
  Matter.Body.applyForce(cork, cork.position, force);
}

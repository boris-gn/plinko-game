export interface BucketConfig {
  index: number;
  multiplier: string;
  multiplierValue: number;
  bgColor?: string;
  bgImage?: boolean;
  animationBgColor?: string;
  color: string;
  strokeColor: string;
  corkLeft?: number;
  corkTop?: number;
  isWinning?: boolean;
}

export interface PegPosition {
  x: number;
  y: number;
  active: boolean;
}

export const GAME_CONFIG = {
  canvas: {
    width: 300,
    height: 380,
    boardTop: 20,
    boardBottom: 340,
    boardLeft: 10,
    boardRight: 290,
  },

  physics: {
    gravity: 1,
    restitution: 0.7,
    friction: 0.05,
    airFriction: 0.005,
  },

  cork: {
    radius: 8,
    density: 0.004,
    restitution: 0.8,
    friction: 0.05,
  },

  peg: {
    radius: 3,
    rows: 9,
    cols: 11,
    verticalGap: 24,
    horizontalGap: 24,
    triangleStartPegs: 3,
  },

  bucket: {
    width: 24,
    height: 42,
    gap: 10, //4,
    count: 8,
    startX: 19, //38,
    topPosition: 315,
  },

  dispenser: {
    x: 150,
    y: 15,
  },

  defaultTurns: 10,
};

export const BUCKETS: BucketConfig[] = [
  {
    index: 0,
    multiplier: "x10",
    multiplierValue: 10,
    bgImage: true,
    color: "#FFFFFF",
    strokeColor: "#B1B000",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 1,
    multiplier: "",
    multiplierValue: 0,
    color: "#CF1322",
    bgColor: "#250000",
    animationBgColor: "#7B0000",
    strokeColor: "#FF2520",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 2,
    multiplier: "x3",
    multiplierValue: 3,
    color: "#0FAE36",
    bgColor: "#004311",
    animationBgColor: "#B4FFC6",
    strokeColor: "#0FAE36",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 3,
    multiplier: "",
    multiplierValue: 0,
    color: "#CF1322",
    bgColor: "#250000",
    animationBgColor: "#7B0000",
    strokeColor: "#FF2520",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 4,
    multiplier: "x1",
    multiplierValue: 1,
    color: "#1D6AFF",
    bgColor: "#002D41",
    animationBgColor: "#CCEFFF",
    strokeColor: "#0551E3",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 5,
    multiplier: "",
    multiplierValue: 0,
    color: "#CF1322",
    bgColor: "#250000",
    animationBgColor: "#7B0000",
    strokeColor: "#FF2520",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 6,
    multiplier: "x5",
    multiplierValue: 5,
    color: "#D39300",
    bgColor: "#463100",
    animationBgColor: "#FFF4DB",
    strokeColor: "#D39300",
    corkLeft: 2,
    corkTop: 7,
  },
  {
    index: 7,
    multiplier: "x7",
    multiplierValue: 7,
    color: "#DE06DE",
    bgColor: "#3C003C",
    animationBgColor: "#FFD1FF",
    strokeColor: "#DE06DE",
    corkLeft: 2,
    corkTop: 7,
  },
];

export interface GameResult {
  bucketIndex: number;
  multiplier: string;
  multiplierValue: number;
}

export enum GameState {
  IDLE = "IDLE",
  FETCHING = "FETCHING",
  DROPPING = "DROPPING",
  LANDED = "LANDED",
  CELEBRATING = "CELEBRATING",
}

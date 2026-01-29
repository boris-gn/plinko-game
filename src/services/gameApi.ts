import { GameResult, BUCKETS } from '../config/gameConfig';

export async function fetchGameResult(): Promise<GameResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const weights = [15, 25, 10, 25, 25];
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const random = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  let bucketIndex = 2;

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      bucketIndex = i;
      break;
    }
  }

  const bucket = BUCKETS[bucketIndex];

  return {
    bucketIndex: bucket.index,
    multiplier: bucket.multiplier,
    multiplierValue: bucket.multiplierValue,
  };
}

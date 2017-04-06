// @flow
import type { Spot, Stone } from './types';

function getNewSpot(
  {
    availableSpots,
    optimalSpot,
    containerSize,
    stone,
  }: {
    availableSpots: Spot[],
    optimalSpot: Spot,
    containerSize: number,
    stone: Stone,
  },
): Spot {
  let right = containerSize;
  const newSpot = {
    right,
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    bottom: null,
  };

  if (availableSpots.length === 4) {
    // debugger;
  }

  for (let i = 0, len = availableSpots.length; i < len; i++) {
    const item = availableSpots[i];

    // check spots on the right
    if (newSpot.left < item.left && newSpot.top < item.top) {
      newSpot.right = item.left;
      break;
    }
  }

  return newSpot;
}

export default getNewSpot;

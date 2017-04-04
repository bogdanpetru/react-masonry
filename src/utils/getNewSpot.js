// @flow
import type { Spot, Position, Stone } from './types';

function getNewSpot(
  {
    availableSpots,
    optimalSpot,
    position,
    containerSize,
    stone,
  }: {
    availableSpots: Spot[],
    optimalSpot: Spot,
    position: Position,
    containerSize: number,
    stone: Stone,
  },
): Spot {
  let right = containerSize;
  // iterate over next availableSpots
  // and see if is cut by another position
  for (let i = 0, len = availableSpots.length; i < len; i++) {
    const item = availableSpots[i];
    if (item === optimalSpot) {
      continue;
    }

    // check spots on the right
    if (optimalSpot.left < item.left && optimalSpot.top < item.top) {
      right = item.left;
      break;
    }
  }

  return {
    right,
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    bottom: null,
  };
}

export default getNewSpot;

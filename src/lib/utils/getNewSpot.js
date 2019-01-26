// @flow

import type { Spot, Stone } from './types';

export function getNewSpot({
  availableSpots,
  optimalSpot,
  containerSize,
  stone,
}: {
  availableSpots: Spot[],
  optimalSpot: Spot,
  containerSize: number,
  stone: Stone,
}): Spot {
  const right = containerSize;
  let newSpot = {
    right,
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    /**
     * New spot should have the same bottom
     * as the spot the stone occupied.
     */
    bottom: optimalSpot.bottom || null,
  };

  /**
   * If new spot is on the left and it's top is smaller than one
   * (first found) it should limit right of the current spot.
   */
  for (let i = 0, len = availableSpots.length; i < len; i += 1) {
    const spot = availableSpots[i];
    // check spots on the right
    if (newSpot.left < spot.left && newSpot.top < spot.top) {
      newSpot.right = spot.left;
      break;
    }
  }

  return newSpot;
}


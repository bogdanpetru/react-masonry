// @flow

import { find, filter } from 'ramda';
import type { stone, position, spot } from './types';

const doesBoxFit = (position: position, stone: stone): boolean =>
  position.right - position.left >= stone.width;

const filterNullSPots = (spot: spot): spot => !!spot;

function getOptimalSpot(
  { availableSpots, stone }: { availableSpots: position[], stone: stone },
): spot {
  // iterate over each position and check where it fits
  if (!availableSpots) {
    return null;
  }
  return find(position => doesBoxFit(position, stone), availableSpots);
}

function placeStone(
  {
    stone,
    availableSpots,
    containerSize,
  }: { stone: stone, availableSpots: spot[], containerSize: number },
) {
  // place stone
  const optimalSpot = getOptimalSpot({ availableSpots, stone });
  const position = {
    left: optimalSpot.left,
    top: optimalSpot.top,
  };

  const newAvailableSpots = availableSpots.map(spot => {
    if (spot === optimalSpot) {
      // restrict used spot
      let usedSpot = { ...optimalSpot };
      usedSpot.left = position.left + stone.width;
      // if the spot is consumed it should be removed
      if (usedSpot.left === usedSpot.right) {
        usedSpot = null;
      }

      return usedSpot;
    }

    return spot;
  });

  // add new spot
  const newSpot = {
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    right: containerSize,
    bottom: null,
  };

  return {
    position,
    availableSpots: [...filter(filterNullSPots, newAvailableSpots), newSpot],
  };
}

export default placeStone;

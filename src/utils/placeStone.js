// @flow

import { find, filter, sort, compose } from 'ramda';
import type { stone, position, spot } from './types';
import sortByTopFirstLeftSecond from './sortByTopFirstLeftSecond';

const doesBoxFit = (position: position, stone: stone): boolean =>
  position.right - position.left >= stone.width;

const filterNullSPots = (spot: spot): boolean => !!spot;

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
  if (stone.width === 65) {
    debugger;
  }

  // place stone
  const optimalSpot = getOptimalSpot({ availableSpots, stone });
  const position = {
    left: optimalSpot.left,
    top: optimalSpot.top,
  };

  // add new spot
  const newSpot = {
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    right: containerSize,
    bottom: null,
  };

  let newAvailableSpots = availableSpots.map(spot => {
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

    // check if placed stone invalidates a space
    // check right
    if (
      spot.right >= optimalSpot.left && position.top + stone.height > spot.top
    ) {
      const constrainedSpot = { ...spot };
      constrainedSpot.right = newSpot.left;
      return constrainedSpot;
    }

    return spot;
  });

  newAvailableSpots = [...filter(filterNullSPots, newAvailableSpots), newSpot];
  newAvailableSpots = sortByTopFirstLeftSecond(newAvailableSpots);

  return {
    position,
    availableSpots: newAvailableSpots,
  };
}

export default placeStone;

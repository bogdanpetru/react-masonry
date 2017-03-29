// @flow

import { find, filter } from 'ramda';
import type { Stone, Position, Spot } from './types';
import sortByTopFirstLeftSecond from './sortByTopFirstLeftSecond';
import getNewSpot from './getNewSpot';

const doesBoxFit = (position: Position, stone: Stone): boolean =>
  position.right - position.left >= stone.width;

const filterNullSPots = (spot: Spot): boolean => !!spot;

function getOptimalSpot(
  { availableSpots, stone }: { availableSpots: Position[], stone: Stone },
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
  }: { stone: Stone, availableSpots: Spot[], containerSize: number },
) {
  // place stone
  const optimalSpot = getOptimalSpot({ availableSpots, stone });
  const position = {
    left: optimalSpot.left,
    top: optimalSpot.top,
  };

  // add new spot
  const newSpot = getNewSpot({
    position,
    optimalSpot,
    availableSpots,
    spot,
    containerSize,
  });

  let newAvailableSpots = availableSpots.map((spot: Spot) => {
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

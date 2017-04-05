// @flow

import { find, filter } from 'ramda';
import type { Stone, Position, Spot } from './types';
import sortByTopFirstLeftSecond from './sortByTopFirstLeftSecond';
import getNewSpot from './getNewSpot';

const doesBoxFit = (position: Position, stone: Stone): boolean =>
  position.right - position.left >= stone.width;

const filterNullSPots = (spot: Spot): boolean => !!spot;

function getOptimalSpot(
  { availableSpots, stone }: { availableSpots: Spot[], stone: Stone },
): Spot {
  // iterate over each position and check where it fits

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
    availableSpots: availableSpots.filter(spot => spot !== optimalSpot),
    stone,
    containerSize,
  });

  let newAvailableSpots = availableSpots.map((spot: Spot) => {
    if (spot === optimalSpot) {
      // restrict used spot
      let usedSpot = { ...optimalSpot };
      usedSpot.left = position.left + stone.width;
      // if the spot is consumed it should be removed
      if (usedSpot.right - usedSpot.left < 5) {
        usedSpot = null;
      }

      return usedSpot;
    }

    if (stone.width === 70) {
      // debugger;
    }

    // check if placed stone invalidates a space
    // check right
    if (
      position.left > spot.left && // make sure it is to the left
      spot.right >= position.left && // and right is already smaller than this position right
      position.top + stone.height > spot.top
    ) {
      console.log('dud');
      const constrainedSpot = { ...spot };
      constrainedSpot.right = position.left;
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

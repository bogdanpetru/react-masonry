// @flow

import find from './find';
import filter from './filter';
import type { Stone, Spot } from './types';
import sortByTopFirstLeftSecond from './sortByTopFirstLeftSecond';
import getNewSpot from './getNewSpot';

const doesBoxFit = (spot: Spot, stone: Stone): boolean => {
  const fitsWidth = spot.right - spot.left >= stone.width;
  if (!spot.bottom) {
    return fitsWidth;
  }
  const fitsHeight = spot.bottom - spot.top >= stone.height;
  return fitsHeight;
};

const filterNullSPots = (spot: Spot): boolean => !!spot;

function getOptimalSpot({ availableSpots, stone }: { availableSpots: Spot[], stone: Stone }): Spot {
  // iterate over each position and check where it fits
  return find(spot => doesBoxFit(spot, stone), availableSpots);
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

    // check if placed stone invalidates a space
    // check right
    if (
      position.left > spot.left && // make sure it is to the left
      spot.right >= position.left && // and right is already smaller than this position right
      position.top + stone.height > spot.top
    ) {
      const constrainedSpot = { ...spot };
      constrainedSpot.right = position.left;
      return constrainedSpot;
    }

    if (position.left + stone.width > spot.left) {
      const constrainedSpot = { ...spot };
      constrainedSpot.bottom = position.top;
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

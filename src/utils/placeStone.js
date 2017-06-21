// @flow

import filter from './filter';
import type { Stone, Spot, Position } from './types';
import sortByTopFirstLeftSecond from './sortByTopFirstLeftSecond';
import getNewSpot from './getNewSpot';
import getOptimalSpot from './getOptimalSpot';

const filterNullSPots = (spot: Spot): boolean => !!spot;

function placeStone(
  {
    stone,
    availableSpots,
    containerSize,
  }: {
    stone: Stone,
    availableSpots: Spot[],
    containerSize: number,
  },
): {
  position: Position,
  availableSpots: Spot[],
} {
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

      // if it has height it shoud be bigger than 5
      if (usedSpot && usedSpot.bottom && usedSpot.bottom - usedSpot.top < 5) {
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

    if (position.left + stone.width > spot.left && position.top >= spot.top) {
      // stome must be placed above this spot
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

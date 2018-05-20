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

  let newAvailableSpots = [...availableSpots, newSpot].map((spot: Spot, index, spotsList) => {
    if (spot === optimalSpot) {
      // restrict used spot
      let usedSpot = { ...optimalSpot };
      usedSpot.left = position.left + stone.width;

      // if the spot is consumed it should be removed
      if (usedSpot.right - usedSpot.left < 5) {
        return null;
      }

      // if it has height it should be bigger than 5
      if (usedSpot.bottom && usedSpot.bottom - usedSpot.top < 5) {
        return null;
      }

      // constrained spot must not overlap with an existing spot
      // this happens when is constrained and another includes it
      /*
        +--------------------------------------+
       |                   +------------------|
       |                   |                 ||
       |                   |                 ||
       |                   |                 ||
       |                   +------------------|
       |                   |                 ||
       |                   |                 ||
       |                   |   should be removed
       |                   |                 ||
       |                   |                 ||
       |                   |                 ||
       |                   +------------------|
       +--------------------------------------+
       
      */
      const spotIsContained = spotsList.some(
            (spot, innerIndex) => innerIndex !== index && usedSpot.left === spot.left
      );
      if (spotIsContained) {
        return null;
      }

      return usedSpot;
    }

    // if spot is above and restricts it's right
    if (
      position.left > spot.left  // make sure it is to the left
      && spot.right >= position.left  // and right is already smaller than this position right
      && position.top + stone.height > spot.top // make sure it is above it
    ) {

      // if it has a bottom, make sure it interescts it
      if (spot.bottom && spot.bottom < position.top) {
        return spot;
      }

      const constrainedSpot = { ...spot };
      constrainedSpot.right = position.left;
      return constrainedSpot;
    }

   // check if it was placed above this spot
    if (
      position.left + stone.width > spot.left && position.top >= spot.top
    ) {
      // check if it used this spot also
      if (spot.top === position.top) {
        return null;
      }

      // if it has already a bottom, must check if it really below it
      // and inside it's left/right
      if (spot.bottom && spot.bottom < position.top) {
        return spot;
      }

      // make sure used space actually intersect
      if (spot.right < position.left) {
        return spot;
      }
      
      const constrainedSpot = { ...spot };
      constrainedSpot.bottom = position.top;
      return constrainedSpot;
    }

    return spot;
  });

  newAvailableSpots = [...filter(filterNullSPots, newAvailableSpots)];
  newAvailableSpots = sortByTopFirstLeftSecond(newAvailableSpots);

  return {
    position,
    availableSpots: newAvailableSpots,
  };
}

export default placeStone;

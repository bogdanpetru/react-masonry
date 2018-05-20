// @flow

import filter from "./filter";
import type { Stone, Spot, Position } from "./types";
import sortByTopFirstLeftSecond from "./sortByTopFirstLeftSecond";
import getNewSpot from "./getNewSpot";
import getOptimalSpot from "./getOptimalSpot";
import { validateSpots } from "./validateSpots";

const filterNullSPots = (spot: Spot): boolean => !!spot;

function placeStone({
  stone,
  availableSpots,
  containerSize
}: {
  stone: Stone,
  availableSpots: Spot[],
  containerSize: number
}): {
  position: Position,
  availableSpots: Spot[]
} {
  // place stone
  const optimalSpot = getOptimalSpot({ availableSpots, stone });
  const position = {
    left: optimalSpot.left,
    top: optimalSpot.top
  };

  // add new spot
  const newSpot = getNewSpot({
    optimalSpot,
    availableSpots: availableSpots.filter(spot => spot !== optimalSpot),
    stone,
    containerSize
  });

  let newAvailableSpots = [...availableSpots, newSpot];

  newAvailableSpots = validateSpots({
    spots: newAvailableSpots,
    position,
    optimalSpot,
    stone
  });
  newAvailableSpots = [...filter(filterNullSPots, newAvailableSpots)];
  newAvailableSpots = sortByTopFirstLeftSecond(newAvailableSpots);

  return {
    position,
    availableSpots: newAvailableSpots
  };
}

export default placeStone;

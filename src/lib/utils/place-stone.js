import { spotAdjustUtils } from "./spot-adjust-utils";
import { filter } from './array-utils';
import { sortByTopFirstLeftSecond } from './place-stone-utils';
import { getNewSpot, getOptimalSpot } from './spot-utils';

export function placeStone({
  stone,
  availableSpots,
  containerSize
}) {
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

  newAvailableSpots = spotAdjustUtils({
    spots: newAvailableSpots,
    position,
    optimalSpot,
    stone
  });
  newAvailableSpots = [...filter(Boolean, newAvailableSpots)];
  newAvailableSpots = sortByTopFirstLeftSecond(newAvailableSpots);

  return {
    position,
    availableSpots: newAvailableSpots
  };
}

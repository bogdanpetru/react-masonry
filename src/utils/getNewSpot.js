// @flow
import type { Spot, Position, Stone } from './types';

function getNewSpot(
  {
    availableSpots,
    optimalSpot,
    position,
    containerSize,
    stone,
  }: {
    availableSpots: Spot[],
    optimalSpot: Spot,
    position: Position,
    containerSize: number,
    stone: Stone,
  },
): Spot {
  return {
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    right: containerSize,
    bottom: null,
  };
}

export default getNewSpot;

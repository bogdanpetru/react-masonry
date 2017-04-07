// @flow

import placeStone from './placeStone';
import type { Stone, Position } from './types';

function placeStones(
  { stones, containerSize }: { stones: Stone[], containerSize: number },
): Position[] | null {
  if (!stones.length) {
    return null;
  }

  const positions = [];
  let availableSpots = [
    {
      top: 0,
      left: 0,
      right: containerSize,
      bottom: null,
    },
  ];

  for (let i = 0, len = stones.length; i < len; i += 1) {
    const stone = stones[i];
    const {
      position,
      availableSpots: newAvailableSpots,
    } = placeStone({
      availableSpots,
      stone,
      containerSize,
    });

    positions.push(position);
    availableSpots = newAvailableSpots;
  }

  return positions;
}

export default placeStones;

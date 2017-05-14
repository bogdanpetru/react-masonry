// @flow

import placeStone from './placeStone';
import type { Stone, Position, Gutter } from './types';

function placeStones(
  {
    stones,
    containerSize,
    gutter,
  }: { stones: Stone[], containerSize: number, gutter: Gutter },
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
    let stone = stones[i];
    if (gutter) {
      stone = {
        width: stone.width + gutter.left + gutter.right,
        height: stone.height + gutter.top + gutter.bottom,
      };
    }
    const {
      position,
      availableSpots: newAvailableSpots,
    } = placeStone({
      availableSpots,
      stone,
      containerSize,
    });

    let newPosition = { ...position };
    if (gutter) {
      newPosition = {
        top: position.top + gutter.top,
        left: position.left + gutter.left,
      };
    }
    positions.push(newPosition);
    availableSpots = newAvailableSpots;
  }

  return positions;
}

export default placeStones;

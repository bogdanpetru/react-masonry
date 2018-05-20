// @flow

import { placeStone } from './placeStone';
import type { Stone, Position, Gutter, Spot } from './types';

export function placeStones(
  {
    stones,
    containerSize,
    gutter,
  }: { stones: Stone[], containerSize: number, gutter: Gutter },
): {
  positions: Position[],
  containerHeight: number
} {
  // it is calculated on each stone placement
  let containerHeight = 0;
  if (!stones.length) {
    return {
      positions: [],
      containerHeight: 0
    };
  }

  const positions = [];
  let availableSpots : Spot[] = [
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
    if (position.top + stone.height > containerHeight) {
      containerHeight = position.top + stone.height;
    }
  } //  end of loop

  return { positions, containerHeight };
}


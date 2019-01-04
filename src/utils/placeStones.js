// @flow

import { placeStone } from "./placeStone";
import type { Stone, Position, Gutter, Spot } from "./types";

const addGutterToStone = (stone: Stone, gutter: Gutter): Stone =>
  gutter
    ? {
        width: stone.width + gutter.left + gutter.right,
        height: stone.height + gutter.top + gutter.bottom
      }
    : stone;

const addGutterToPosition = (position: Position, gutter: Gutter): Position =>
  gutter
    ? {
        top: position.top + gutter.top,
        left: position.left + gutter.left
      }
    : position;

const getContainerHeight = (
  containerHeight: number,
  stone: Stone,
  position: Position
): number =>
  position.top + stone.height > containerHeight
    ? position.top + stone.height
    : containerHeight;

export function placeStones({
  stones,
  containerSize,
  gutter
}: {
  stones: Stone[],
  containerSize: number,
  gutter: Gutter
}): {
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

  return stones.reduce(
    (acc, stone) => {
      const { positions, availableSpots, containerHeight } = acc;
      const preparedStone = addGutterToStone(stone);

      const { position, availableSpots: newAvailableSpots } = placeStone({
        availableSpots,
        stone: preparedStone,
        containerSize
      });

      const newPosition = addGutterToPosition(position, gutter);

      acc.positions.push(newPosition);
      acc.availableSpots = newAvailableSpots;
      acc.containerHeight = getContainerHeight(
        containerHeight,
        preparedStone,
        newPosition
      );

      return acc;
    },
    {
      positions: [],
      containerHeight,
      availableSpots: [
        {
          top: 0,
          left: 0,
          right: containerSize,
          bottom: null
        }
      ]
    }
  );
}

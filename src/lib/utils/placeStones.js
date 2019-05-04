import { placeStone } from "./placeStone";
import { normalizeGutter } from "./normalizeGutter";

const addGutterToStone = (stone, gutter) =>
  gutter
    ? {
        width: stone.width + gutter.left + gutter.right,
        height: stone.height + gutter.top + gutter.bottom
      }
    : stone;

const addGutterToPosition = (position, gutter) =>
  gutter
    ? {
        top: position.top + gutter.top,
        left: position.left + gutter.left
      }
    : position;

const getContainerHeight = (containerHeight, stone, position) =>
  position.top + stone.height > containerHeight
    ? position.top + stone.height
    : containerHeight;

const defaultPositions = {
  positions: [],
  containerHeight: 0
};

export const placeStones = ({ stones, containerSize, gutter = 0 }) => {
  if (!stones.length) return defaultPositions;

  let containerHeight = 0;
  const positions = [];
  let availableSpots = [
    { top: 0, left: 0, right: containerSize, bottom: null }
  ];

  const preparedGutter = normalizeGutter(gutter);
  for (const stone of stones) {
    const preparedStone = addGutterToStone(stone, preparedGutter);
    const spec = placeStone({
      availableSpots,
      stone: preparedStone,
      containerSize
    });

    positions.push(spec.position);
    availableSpots = spec.availableSpots;
  }

  return {
    availableSpots,
    positions,
    containerHeight
  };
};

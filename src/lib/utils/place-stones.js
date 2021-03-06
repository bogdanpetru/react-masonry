import { placeStone } from './place-stone';
import { addGutterToStone, normalizeGutter } from './gutter-utils';

export const placeStones = ({ stones, containerSize, gutter = 0 }) => {
  const defaultPositions = {
    positions: [],
    containerHeight: 0
  };

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

    const stoneBottom = spec.position.top + stone.height;
    if (containerHeight < stoneBottom) {
      containerHeight = stoneBottom;
    }

    positions.push(spec.position);
    availableSpots = spec.availableSpots;
  }

  return {
    availableSpots,
    positions,
    containerHeight
  };
};

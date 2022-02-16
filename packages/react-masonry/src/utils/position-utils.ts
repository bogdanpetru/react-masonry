import { Position, Stacking } from "../types";

/**
 right-bottom - default
 left-bottom - right = left
 right-top - bottom-top
 left-top - bottomtop / right=left

 */
function translatePositions({ positions, stacking }: { positions: Position[], stacking: Stacking }) {
  if (stacking === 'left-bottom') {
    return positions.map(({ top, left }) => ({ top, right: left }));
  }

  if (stacking === 'right-top') {
    return positions.map(({ top, left }) => ({ bottom: top, left }));
  }

  if (stacking === 'left-top') {
    return positions.map(({ top, left }) => ({ bottom: top, right: left }));
  }

  return positions;
}

export { translatePositions };

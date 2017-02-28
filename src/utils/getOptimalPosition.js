// @flow

import { find } from 'ramda';
import type { box, position } from './types';

const doesBoxFit = (position: position, box: box): boolean =>
  position.right - position.left >= box.width;

function getOptimalPosition(
  { availablePositions, box }: { availablePositions: position[], box: box },
): position {
  // iterate over each position and check where it fits
  return find(
    (position: position) => doesBoxFit(position, box),
    availablePositions,
  );
}

export default getOptimalPosition;

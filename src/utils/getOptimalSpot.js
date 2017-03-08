// @flow

import { find } from 'ramda';
import type { box, position } from './types';

const doesBoxFit = (position: position, box: box): boolean =>
  position.right - position.left >= box.width;

function getOptimalSpot(
  { availableSpots, box }: { availableSpots: position[], box: box },
): position {
  // iterate over each position and check where it fits
  if (!availableSpots) {
    return null
  }
  return find(position => doesBoxFit(position, box), availableSpots);
}

export default getOptimalSpot;

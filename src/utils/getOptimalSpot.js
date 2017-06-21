// @flow
import type { Spot, Stone } from './types';
import find from './find';

const doesBoxFit = (spot: Spot, stone: Stone): boolean => {
  const fitsWidth = spot.right - spot.left >= stone.width;
  if (!spot.bottom) {
    return fitsWidth;
  }

  const fitsHeight = spot.bottom - spot.top >= stone.height;
  return fitsWidth && fitsHeight;
};

function getOptimalSpot({ availableSpots, stone }: { availableSpots: Spot[], stone: Stone }): Spot {
  // iterate over each position and check where it fits
  return find(spot => doesBoxFit(spot, stone), availableSpots);
}

export default getOptimalSpot;

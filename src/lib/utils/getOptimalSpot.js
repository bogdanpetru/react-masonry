import { find } from "./find";

const doesBoxFit = (spot, stone) => {
  const fitsWidth = spot.right - spot.left >= stone.width;
  if (!spot.bottom) {
    return fitsWidth;
  }

  const fitsHeight = spot.bottom - spot.top >= stone.height;
  return fitsWidth && fitsHeight;
};

export const getOptimalSpot = ({ availableSpots, stone }) =>
  find(spot => doesBoxFit(spot, stone), availableSpots);

// @flow

import { sort } from "./sort";
import type { Spot } from "./types";

const sortByTop = (current: Spot, next: Spot) => {
  if (current.top === next.top) {
    return current.left < next.left ? -1 : 1;
  }

  return current.top < next.top ? -1 : 1;
};

/**
 * First sorts by top, and then if top is the same
 * the one with the smallest left will win
 */
export const sortByTopFirstLeftSecond = (list: any[]): any[] =>
  sort(sortByTop, list);

// @flow
import type { Gutter } from './types';

export function normalizeGutter(gutter: Gutter | number): Gutter {
  if (typeof gutter === 'object') {
    const normalizedGutter = { ...gutter }

    // make sure no direction is null
    if (!normalizedGutter.left) {
      normalizedGutter.left = 0;
    }
    if (!normalizedGutter.right) {
      normalizedGutter.right = 0;
    }
    if (!normalizedGutter.top) {
      normalizedGutter.top = 0;
    }
    if (!normalizedGutter.bottom) {
      normalizedGutter.bottom = 0;
    }
    return normalizedGutter;
  }

  return {
    top: gutter / 2,
    left: gutter / 2,
    bottom: gutter / 2,
    right: gutter / 2,
  };
}

export const addGutterToStone = (stone, gutter) =>
  gutter
    ? {
      width: stone.width + gutter.left + gutter.right,
      height: stone.height + gutter.top + gutter.bottom
    }
    : stone;

export const addGutterToPosition = (position, gutter) =>
  gutter
    ? {
      top: position.top + gutter.top,
      left: position.left + gutter.left
    }
    : position;

export const getContainerHeight = (containerHeight, stone, position) =>
  position.top + stone.height > containerHeight
    ? position.top + stone.height
    : containerHeight;

export function normalizeGutter(gutter) {
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

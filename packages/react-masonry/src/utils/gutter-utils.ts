import { Stone, Position } from '../internal-types'
import { Gutter, GutterFullSpecified } from '../types'

export const addGutterToStone = (stone: Stone, gutter: GutterFullSpecified) =>
  gutter
    ? {
        width: stone.width + (gutter.left ?? 0) + (gutter.right ?? 0),
        height: stone.height + (gutter.top ?? 0) + (gutter.bottom ?? 0),
      }
    : stone

export const addGutterToPosition = (
  position: Position,
  gutter: GutterFullSpecified,
) =>
  gutter
    ? {
        top: position.top + (gutter.top ?? 0),
        left: position.left + (gutter.left ?? 0),
      }
    : position

export const getContainerHeight = (
  containerHeight: number,
  stone: Stone,
  position: Position,
) =>
  position.top + stone.height > containerHeight
    ? position.top + stone.height
    : containerHeight

export function normalizeGutter(gutter: Gutter): GutterFullSpecified {
  if (typeof gutter === 'object') {
    const normalizedGutter = { ...gutter }

    // make sure no direction is null
    if (!normalizedGutter.left) {
      normalizedGutter.left = 0
    }
    if (!normalizedGutter.right) {
      normalizedGutter.right = 0
    }
    if (!normalizedGutter.top) {
      normalizedGutter.top = 0
    }
    if (!normalizedGutter.bottom) {
      normalizedGutter.bottom = 0
    }
    return normalizedGutter
  }

  return {
    top: gutter / 2,
    left: gutter / 2,
    bottom: gutter / 2,
    right: gutter / 2,
  }
}

import { placeStone } from './place-stone'
import { addGutterToStone, normalizeGutter } from './gutter-utils'
import { Spot, Stone, Position } from '../internal-types'
import { Gutter } from '../types'

export const placeStones = ({
  stones,
  containerSize,
  gutter = 0,
}: {
  stones: Stone[]
  containerSize: number
  gutter: Gutter
}): {
  availableSpots?: Spot[]
  positions: Position[]
  containerHeight: number
} => {
  const defaultPositions: { positions: Position[]; containerHeight: number } = {
    positions: [],
    containerHeight: 0,
  }

  if (!stones.length) return defaultPositions

  let containerHeight = 0
  const positions = []
  let availableSpots: Spot[] = [{ top: 0, left: 0, right: containerSize }]

  const preparedGutter = normalizeGutter(gutter)
  for (const stone of stones) {
    const preparedStone = addGutterToStone(stone, preparedGutter)
    const spec = placeStone({
      availableSpots,
      stone: preparedStone,
      containerSize,
    })

    const stoneBottom = spec.position.top + stone.height
    if (containerHeight < stoneBottom) {
      containerHeight = stoneBottom
    }

    positions.push(spec.position)
    availableSpots = spec.availableSpots
  }

  return {
    availableSpots,
    positions,
    containerHeight,
  }
}

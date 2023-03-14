import { placeStone } from './place-stone'
import { Spot, Stone, Position } from '../internal-types'

export const placeStones = ({
  stones,
  containerSize,
}: {
  stones: Stone[]
  containerSize: number
}): {
  availableSpots: Spot[]
  positions: Position[]
  containerHeight: number
} => {
  const defaultPositions = {
    positions: [],
    containerHeight: 0,
    availableSpots: [],
  }

  if (!stones.length) return defaultPositions

  let containerHeight = 0
  const positions = []

  let availableSpots: Spot[] = [{ top: 0, left: 0, right: containerSize }]
  for (const stone of stones) {
    const spec = placeStone({
      availableSpots,
      stone,
      containerSize: containerSize,
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

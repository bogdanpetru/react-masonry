// @flow


import { find, filter } from 'ramda'
import type { stone, position } from './types'

const doesBoxFit = (position: position, stone: stone): boolean =>
  position.right - position.left >= stone.width

function getOptimalSpot(
  { availableSpots, stone }: { availableSpots: position[], stone: stone },
): position {
  // iterate over each position and check where it fits
  if (!availableSpots) {
    return null
  }
  return find(position => doesBoxFit(position, stone), availableSpots)
}


function placeStone({ stone, availableSpots } : { stone: stone, availableSpots: spot[] })  {
  // place stone
  const optimalSpot = getOptimalSpot({ availableSpots, stone })
  const position = {
    left: optimalSpot.left,
    top: optimalSpot.top
  }

  const newAvailableSpots = availableSpots.map(spot => {
    if (spot === optimalSpot) {
      // restrict used spot
      const usedSpot = { ...optimalSpot }
      usedSpot.left = position.left + stone.width
      return usedSpot
    }

    return spot
  })


  return {
    position,
    availableSpots: newAvailableSpots
  }
}


export default placeStone

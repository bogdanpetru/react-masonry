// @flow
import { compose, map, sort } from 'ramda'
import type { position } from './types'

const sortByHeight = (current: position, next: position) => {
  return current.bottom <= next.bottom && current.left <= next.left ? -1 : 1
}

const mapPositionToSpot = (position: position) => {
  return !position ? null : {
    top: position.bottom,
    left: position.left,
    right: position.right,
    bottom: null, // later
  }
}

const getAvailableSpots = (
  {
    previousRow,
    // currentRow,
  }: { previousRow: position[], currentRow: position[] },
): position[] => compose(map(mapPositionToSpot), sort(sortByHeight))(previousRow)


export default getAvailableSpots

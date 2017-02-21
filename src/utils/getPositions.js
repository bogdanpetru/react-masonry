// @flow

type box = {
  width: number,
  height: number,
}

function getPositions({ boxes, width } : { boxes: box[], width: number}) {
  // position first row
  const intermediarPositions = boxes.reduce(
    (acc, item) => {
      acc.positions.push({
        top: acc.currentTop,
        left: acc.currentLeft
      })
      acc.currentLeft += item.width

      return acc
    },
    { currentLeft: 0, currentTop: 0, positions: [] }
  )

  return intermediarPositions.positions
}

export default getPositions

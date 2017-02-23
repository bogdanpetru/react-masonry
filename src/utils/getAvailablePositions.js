// @flow

type position = {
  top: number,
  left: number,
  right: number,
  bottom: number,
};

function getAvailablePositions(
  {
    previousRow,
    // currentRow,
  }: { previousRow: position[], currentRow: position[] },
): position[] {
  // at this moment just construct the holes in order
  return previousRow
    .sort((current, next) => {
      return current.bottom < next.bottom ? -1 : 1;
    })
    .map(item => ({
      top: item.bottom,
      left: item.left,
      right: item.right,
      bottom: null, // later
    }));
}

export default getAvailablePositions;

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
  const order = previousRow
    .map((item, index) => ({ ...item, index }))
    .sort((current, next) => {
      return current.bottom < next.bottom ? -1 : 1;
    })
    .map(item => item.index);

  return order.map(index => {
    return {
      top: previousRow[index].bottom,
      left: previousRow[index].left,
      right: previousRow[index].right,
      bottom: null, // later
    };
  });
}

export default getAvailablePositions;

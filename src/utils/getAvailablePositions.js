// @flow

type position = {
  left: number,
  top: number,
  right: number,
  bottom: number,
};

function getAvailablePositions(
  {
    previousRow,
    currentRow,
  }: { previousRow: position[], currentRow: position[] },
) {
  // at this moment just construct the holes in order
  const availablePositions = previousRow.sort((current, next) => {
    return current < next ? -1 : 1;
  });

  return availablePositions;
}

export default getAvailablePositions;

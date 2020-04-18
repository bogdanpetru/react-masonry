const isSpotConsumed = spot =>
  // width
  spot.right - spot.left < 5 ||
  // height
  (spot.bottom && spot.bottom - spot.top < 5);

/*

  constrained spot must not overlap with an existing spot
  this happens when is constrained and another includes it

  +--------------------------------------+
  |                   +------------------|
  |                   |                 ||
  |                   |                 ||
  |                   |                 ||
  |                   +------------------|
  |                   |                 ||
  |                   |                 ||
  |                   |   should be removed
  |                   |                 ||
  |                   |                 ||
  |                   |                 ||
  |                   +------------------|
  +--------------------------------------+
*/
const isSpotContained = ({ spotsList, usedSpot }) =>
  spotsList.some(
    currentSpot =>
      currentSpot !== usedSpot && usedSpot.left === currentSpot.left
  );

const constrainRight = ({ position, spot, stone }) => {
  // if spot is above and restricts it's right
  if (
    position.left > spot.left && // make sure it is to the left
    spot.right >= position.left && // and right is already smaller than this position right
    position.top + stone.height > spot.top // make sure it is above it
  ) {
    // if it has a bottom, make sure it interescts it
    if (spot.bottom && spot.bottom < position.top) {
      return spot;
    }

    const constrainedSpot = { ...spot };
    constrainedSpot.right = position.left;
    return constrainedSpot;
  }

  return null;
};

const constrainBottom = ({ position, stone, spot }) => {
  // check if it was placed above this spot
  if (position.left + stone.width > spot.left && position.top >= spot.top) {
    // if it has already a bottom, must check if it really below it
    // and inside it's left/right
    if (spot.bottom && spot.bottom < position.top) {
      return spot;
    }

    // make sure used space actually intersect
    if (spot.right < position.left) {
      return spot;
    }

    const constrainedSpot = { ...spot };
    constrainedSpot.bottom = position.top;
    return constrainedSpot;
  }

  return null;
};

// handle spot that was occupied, it might be consumed or restricted
const getConsumedSpot = ({ stone, position, spotsList, optimalSpot }) => {
  // restrict used spot
  let usedSpot = { ...optimalSpot };
  usedSpot.left = position.left + stone.width;

  if (isSpotConsumed(usedSpot)) {
    return null;
  }

  if (isSpotContained({ usedSpot, spotsList })) {
    return null;
  }

  return usedSpot;
};

export const spotAdjustUtils = ({ spots, position, optimalSpot, stone }) =>
  spots.map((spot, index, spotsList) => {
    if (spot === optimalSpot) {
      return getConsumedSpot({ stone, position, optimalSpot, spotsList });
    }

    const rightConstrained = constrainRight({ position, spot, stone });
    if (rightConstrained) {
      return rightConstrained;
    }

    const bottomConstrained = constrainBottom({ position, stone, spot });
    if (bottomConstrained) {
      return bottomConstrained;
    }

    return spot;
  });

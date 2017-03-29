function getNewSpot(
  { availableSpots, optimalSpot, position, containerSize, stone },
) {
  return {
    top: optimalSpot.top + stone.height,
    left: optimalSpot.left,
    right: containerSize,
    bottom: null,
  };
}

export default getNewSpot;

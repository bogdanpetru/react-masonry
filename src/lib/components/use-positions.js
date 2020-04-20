import { useState, useEffect } from "react";
import { placeStones } from "../utils/place-stones";

const getStones = stoneNodes => {
  return stoneNodes
    .map(stone => {
      if (!stone) {
        return null;
      }

      const rect = stone.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    })
    .filter(Boolean);
};

const usePositions = ({
  boxesRefs,
  wrapperRef,
  gutter,
  children,
  windowWidth
}) => {
  const [{ positions, containerHeight, stones }, setPositionsSpec] = useState({
    positions: [],
    containerHeight: null,
    stones: [],
  });

  useEffect(() => {
    const stones = getStones(boxesRefs.current);
    const containerSize = wrapperRef.current.offsetWidth;
    const spec = placeStones({
      stones,
      gutter,
      containerSize
    });

    setPositionsSpec({ ...spec, stones }); // TODO refactor spec
  }, [children, gutter, boxesRefs, wrapperRef, windowWidth]);

  return { positions, containerHeight, stones };
};

export { usePositions };

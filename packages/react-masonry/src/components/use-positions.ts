import React, { useState, useEffect } from "react";
import { Stone, Position } from "../internal-types";
import { Gutter, } from "../types";
import { placeStones } from "../utils/place-stones";

const getStones = (stoneNodes: HTMLElement[]): Stone[] => {
  return stoneNodes
    .map((stone) => {
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
}: {
  boxesRefs: React.MutableRefObject<HTMLElement[]>,
  wrapperRef: React.MutableRefObject<HTMLElement>,
  gutter: Gutter,
  children: React.ReactNode,
  windowWidth: number
}) => {
  const [{ positions, containerHeight, stones }, setPositionsSpec] = useState<{
    positions: Position[],
    containerHeight: number,
    stones: Stone[]
  }>({
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

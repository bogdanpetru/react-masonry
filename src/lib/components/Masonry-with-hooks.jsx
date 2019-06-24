import React, { cloneElement, useRef, useState, useEffect } from "react";
import { usePositions } from "./usePositions";
import { translatePositions } from "../utils/translatePositions";

import { getStoneStyle } from "./style";

const placeBox = ({ boxesRefs, positions, transition, transitionDuration }) => (
  child,
  index
) => {
  const stoneProps = {
    style: getStoneStyle({
      style: child.props.style,
      position: positions[index],
      transition,
      transitionDuration
    }),
    ref: ref => (boxesRefs.current[index] = ref),
    key: child.props.key || index
  };

  return cloneElement(child, {
    ...child.props,
    ...stoneProps
  });
};

const usePositionsOneAtATime = (positions, transitionStep = 100) => {
  const [oneAtATimePositions, setPositions] = useState([]);
  const timeoutRef = useRef();

  const placeStone = (positions, currentStone = 0) => {
    if (positions.length + 1 < currentStone) {
      return;
    }

    setPositions(positions.slice(0, currentStone));

    timeoutRef.current = setTimeout(
      () => placeStone(positions, currentStone + 1),
      transitionStep
    );
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    placeStone(positions);
  }, [positions]);

  return oneAtATimePositions;
};

const Masonry = ({
  children,
  gutter,
  style,
  transition = false,
  transitionDuration = 300,
  transitionStep = 100,
  stacking,
  ...rest
}) => {
  const boxesRefs = useRef([]);
  const wrapperRef = useRef();

  const { positions, containerHeight } = usePositions({
    boxesRefs,
    wrapperRef,
    gutter,
    children
  });

  const preparedPositions = translatePositions({
    positions: usePositionsOneAtATime(positions, transitionStep),
    stacking
  });

  const preparedStyle = {
    minHeight: containerHeight,
    position: "relative",
    ...style
  };

  return (
    <div ref={wrapperRef} style={preparedStyle} {...rest}>
      {children.map(
        placeBox({
          boxesRefs,
          positions: preparedPositions,
          transition,
          transitionDuration
        })
      )}
    </div>
  );
};

export { Masonry };

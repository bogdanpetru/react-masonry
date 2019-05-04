import React, { cloneElement, useRef } from "react";
import { usePositions } from "./usePositions";

const getPositionStyle = position => {
  if (!position) {
    return { opacity: 0, top: 0, left: 0 };
  }

  return { ...position, opacity: 1 };
};

const getStoneStyle = ({ style, position }) => {
  return {
    ...style,
    position: "absolute",
    ...getPositionStyle(position)
  };
};

const placeBoxes = (boxesRefs, positions) => (child, index) => {
  const stoneProps: any = {
    style: getStoneStyle({
      style: child.props.style,
      position: positions[index]
    }),
    ref: ref => (boxesRefs.current[index] = ref),
    key: child.props.key || index
  };

  return cloneElement(child, {
    ...child.props,
    ...stoneProps
  });
};

const Masonry = ({ children, gutter, style }) => {
  const boxesRefs = useRef([]);
  const wrapperRef = useRef();
  const { positions, containerHeight } = usePositions({
    boxesRefs,
    wrapperRef,
    gutter,
    children
  });

  const preparedStyle = {
    minHeight: containerHeight,
    position: "relative",
    ...style
  };

  return (
    <div ref={wrapperRef} style={preparedStyle}>
      {children.map(placeBoxes(boxesRefs, positions))}
    </div>
  );
};

export { Masonry };

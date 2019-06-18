import React, { cloneElement, useRef } from "react";
import { usePositions } from "./usePositions";

import { getStoneStyle } from "./style";

const placeBoxes = ({
  boxesRefs,
  positions,
  transition,
  transitionDuration
}) => (child, index) => {
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

const Masonry = ({
  children,
  gutter,
  style,
  transition = false,
  transitionDuration = 300,
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

  const preparedStyle = {
    minHeight: containerHeight,
    position: "relative",
    ...style
  };

  return (
    <div ref={wrapperRef} style={preparedStyle} {...rest}>
      {children.map(placeBoxes({boxesRefs, positions, transition, transitionDuration}))}
    </div>
  );
};

export { Masonry };

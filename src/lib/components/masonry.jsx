import React, { cloneElement, useRef, useState, useEffect } from "react";

import { usePositions } from "./use-positions.js";
import { usePositionsOneAtATime } from "./use-positions-one-at-a-time";

import { getStoneStyle } from "./style";
import { translatePositions } from '../utils/position-utils';


const useWindowWidth = () => {
  const [width, setWidth] = useState();

  useEffect(() => {
    const onResize = () => { // todo add throttle
      setWidth(global.innerWidth);
    }
    global.addEventListener('resize', onResize);

    return () => {
      global.removeEventListener('resize', onResize);
    }
  }, [])

  return width;
}

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

  const windowWidth = useWindowWidth();

  const { positions, containerHeight } = usePositions({
    boxesRefs,
    wrapperRef,
    gutter,
    children,
    windowWidth,
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
      {children.map((child, index) => {
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
      })}
    </div>
  );
};

export { Masonry };

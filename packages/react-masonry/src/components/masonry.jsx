import React, { cloneElement, useRef } from 'react';

import { usePositions } from './use-positions.js';
import { usePositionsOneAtATime } from './use-positions-one-at-a-time';

import { getStoneStyle } from './style';
import { translatePositions } from '../utils/position-utils';
import { useWindowWidth } from './use-window-width';

const Masonry = ({
  children,
  gutter,
  style,
  transition,
  transitionDuration,
  transitionStep,
  stacking,
  ...rest
}) => {
  const boxesRefs = useRef([]);
  const wrapperRef = useRef();
  const windowWidth = useWindowWidth();

  const { positions, containerHeight, stones } = usePositions({
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

Masonry.defaultProps = {
  transition: false,
  transitionDuration: 800,
  transitionStep: 100,
};

export { Masonry };

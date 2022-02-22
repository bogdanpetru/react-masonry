import { MasonryProps } from "../types";
import { Position } from '../internal-types'

const transitionStyles = (transitionDuration: number) => ({
  fade: `${transitionDuration}ms opacity ease`,
  fadeMove: `
    ${transitionDuration}ms opacity ease,
    ${transitionDuration}ms top ease,
    ${transitionDuration}ms left ease
  `,
  move: `
    ${transitionDuration}ms top ease,
    ${transitionDuration}ms left ease
  `
});

const getTransitionStyle = (
  { transition, transitionDuration }:
    { transition: MasonryProps['transition'], transitionDuration: number }
) => {
  if (!transition) {
    return null;
  }

  return { transition: transitionStyles(transitionDuration)[transition] };
};

const getPositionStyle = (position: Position) => {
  if (!position) {
    return { opacity: 0, top: 0, left: 0 };
  }

  return { ...position, opacity: 1 };
};

const getStoneStyle = (
  { style, position, transition, transitionDuration }:
    { style: React.CSSProperties, position: Position, transition: MasonryProps['transition'], transitionDuration: number }
) => {
  return {
    ...style,
    position: "absolute",
    ...getPositionStyle(position),
    ...getTransitionStyle({ transition, transitionDuration })
  };
};

export { getStoneStyle };

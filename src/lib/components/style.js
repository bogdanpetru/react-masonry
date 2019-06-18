const transitionStyles = transitionDuration => ({
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

const getTransitionStyle = ({ transition, transitionDuration }) => {
  if (!transition) {
    return null;
  }

  return { transition: transitionStyles(transitionDuration)[transition] };
};

const getPositionStyle = position => {
  if (!position) {
    return { opacity: 0, top: 0, left: 0 };
  }

  return { ...position, opacity: 1 };
};

const getStoneStyle = ({ style, position, transition, transitionDuration }) => {
  return {
    ...style,
    position: "absolute",
    ...getPositionStyle(position),
    ...getTransitionStyle({ transition, transitionDuration })
  };
};

export { getStoneStyle };

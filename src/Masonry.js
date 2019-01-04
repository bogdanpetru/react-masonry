// @flow

import React, { PureComponent } from "react";
import debounce from "lodash.debounce";

import { placeStones } from "./utils/placeStones";
import { translatePositions } from "./utils/translatePositions";

import type { Position, Stone } from "./utils/types";
import type { State, Props } from "./utils/types";

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

const getStoneSize = stone => ({
  width: stone.offsetWidth,
  height: stone.offsetHeight
});

export class Masonry extends PureComponent<Props, State> {
  node: HTMLElement | null;
  stoneNodes: Array<HTMLElement> = [];

  state = { positions: [], availableSpots: [], containerHeight: 0 };
  transitionTimeoutId = null;
  isFirstRender = true;

  static defaultProps = {
    gutter: 0,
    renderAfterImagesLoaded: false,
    renderOnEachImageLoad: true,
    transition: false,
    transitionDuration: 300,
    transitionStep: 50,
    updateOnWindowResize: true,
    updateOnWindowResizeDebounceWait: 300
  };

  componentDidMount() {
    this.placeStones();
    this.handleUpdateOnWindowResize();
    this.isFirstRender = false;
  }

  componentWillUnmount() {
    const { updateOnWindowResize } = this.props;

    if (updateOnWindowResize) {
      window.removeEventListener("resize", this.debouncedPlaceStones);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stacking !== prevProps.stacking) {
      this.placeStones();
    }
  }

  handleUpdateOnWindowResize() {
    const {
      updateOnWindowResize,
      updateOnWindowResizeDebounceWait
    } = this.props;
    if (updateOnWindowResize) {
      this.debouncedPlaceStones = debounce(
        () => this.placeStones(),
        updateOnWindowResizeDebounceWait
      );
      window.addEventListener("resize", this.debouncedPlaceStones);
    }
  }

  setRef = ref => {
    this.node = ref;
  };

  setStoneRef = index => ref => (this.stoneNodes[index] = ref);

  /**
   * Reads with/height of each DOM element
   */
  getStones(): Array<Stone> {
    return this.stoneNodes.map(getStoneSize);
  }

  getPositions(stones?: Stone[]) {
    if (this.node === null) {
      return;
    }

    const { gutter, stacking } = this.props;
    const containerSize = this.node.offsetWidth;
    stones = stones || this.getStones();

    let { positions, containerHeight } = placeStones({
      containerSize,
      stones,
      gutter
    });

    positions = translatePositions({ positions, stacking });

    return { positions, containerHeight };
  }

  /**
   * Runs the layout algorithm
   * and sets on state the current stone positions
   */
  placeStones = (stones?: Stone[]) => {
    const { positions, containerHeight } = this.getPositions(stones);

    const { transition } = this.props;
    if (transition && this.isFirstRender) {
      if (this.transitionTimeoutId) {
        clearTimeout(this.transitionTimeoutId);
        this.transitionTimeoutId = null;
      }
      this.setState({ containerHeight }, () =>
        this.placeStonesForTransition(positions)
      );
    } else {
      // set all stone on one render
      this.setState({ positions, containerHeight, stones });
    }
  };

  placeStonesForTransition(positions: Position[], currentStone: number = 0) {
    const { transitionStep } = this.props;

    this.setState(
      {
        positions: positions.slice(0, currentStone)
      },
      () => {
        if (currentStone === positions.length + 1) {
          return;
        }
        this.transitionTimeoutId = setTimeout(() => {
          this.placeStonesForTransition(positions, currentStone + 1);
        }, transitionStep);
      }
    );
  }

  getTransitionStyle() {
    const { transition, transitionDuration } = this.props;

    if (!transition) {
      return null;
    }

    return { transition: transitionStyles(transitionDuration)[transition] };
  }

  getPositionStyle(index: number): Object {
    let positionStyle;
    if (this.state.positions) {
      positionStyle = this.state.positions[index];
    }
    if (positionStyle) {
      positionStyle = { ...positionStyle, opacity: 1 };
    } else {
      positionStyle = { opacity: 0, top: 0, left: 0 };
    }

    return positionStyle;
  }

  getStoneStyle(childStyle, index) {
    return {
      ...childStyle,
      position: "absolute",
      ...this.getPositionStyle(index),
      ...this.getTransitionStyle()
    };
  }

  renderStone = (child, index) => {
    const stoneProps: any = {
      style: this.getStoneStyle(child.props.style, index),
      ref: this.setStoneRef(index),
      key: child.props.key || index
    };

    return React.cloneElement(child, {
      ...child.props,
      ...stoneProps
    });
  };

  render() {
    const { children } = this.props;
    const style = {
      ...this.props.style,
      position: "relative",
      minHeight: this.state.containerHeight
    };

    return (
      <div style={style} ref={this.setRef}>
        {children.map(this.renderStone)}
      </div>
    );
  }
}

// @flow

import React, { PureComponent } from "react";
import { placeStones } from "./utils/placeStones";
import { normalizeGutter } from "./utils/normalizeGutter";
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
  height: stone.offsetHeight,
});

export class Masonry extends PureComponent<Props, State> {
  node: HTMLElement | null;
  stoneNodes: Array<HTMLElement> = [];

  state = {
    positions: [],
    availableSpots: [],
    containerHeight: 0
  };

  static defaultProps = {
    gutter: 0,
    transitionDuration: 300,
    transitionStep: 50,
    transition: false,
    renderAfterImagesLoaded: false,
    renderOnEachImageLoad: true
  };

  componentDidMount() {
    this.placeStones();
  }

  setRef = ref => {
    this.node = ref;
  }

  setStoneRef = index => ref =>
    this.stoneNodes[index] = ref

  /**
   * Reads with/height of each DOM element
   */
  getStones(): Array<Stone> {
    return this.stoneNodes.map(getStoneSize);
  }

  /**
   * Runs the layout algorithm
   * and sets on state the current stone positions
   */
  placeStones(stones?: Stone[]) {
    if (this.node === null) {
      return;
    }

    const containerSize = this.node.offsetWidth;
    stones = stones || this.getStones();
    const gutter = normalizeGutter(this.props.gutter);

    const { positions, containerHeight } = placeStones({
      containerSize,
      stones,
      gutter
    });

    const { transition } = this.props;
    if (transition) {
      this.placeStonesForTransition(positions);
      this.setState({
        containerHeight
      });
    } else {
      // set all stone on one render
      this.setState({
        positions,
        containerHeight
      });
    }
  }

  placeStonesForTransition(positions: Position[], currentStone: number = 0) {
    const { transitionStep } = this.props;

    this.setState(
      {
        positions: positions.slice(0, currentStone)
      },
      () => {
        setTimeout(() => {
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

    return {
      transition: transitionStyles(transitionDuration)[transition]
    };
  }

  getPositionStyle(index: number): Object {
    let positionStyle;
    if (this.state.positions) {
      positionStyle = this.state.positions[index];
    }
    if (positionStyle) {
      positionStyle = { ...positionStyle, opacity: 1 };
    } else {
      positionStyle = {
        opacity: 0,
        top: 0,
        left: 0
      };
    }

    return positionStyle;
  }

  getStoneStyle(childStyle, index) {
    return {
      ...childStyle,
      position: 'absolute',
      ...this.getPositionStyle(index),
      ...this.getTransitionStyle()
    };
  }

  renderStone = (child, index) => {
    const stoneProps: any = {
      style: this.getStoneStyle(child.props.style, index),
      ref: this.setStoneRef(index),
      key: child.props.key || index,
    };

    return React.cloneElement(child, {
      ...child.props,
      ...stoneProps
    });
  }


  render() {
    const style = {
      ...this.props.style,
      position: "relative",
      minHeight: this.state.containerHeight
    };

    return (
      <div
        style={style}
        ref={this.setRef}
      >
        {this.props.children.map(this.renderStone)}
      </div>
    );
  }
}

// @flow

import React, { PureComponent } from "react";
import { placeStones } from "./utils/placeStones";
import { normalizeGutter } from "./utils/normalizeGutter";
import type { Position, Stone, Gutter, Spot } from "./utils/types";

type State = {
  positions: Position[],
  availableSpots: Spot[],
  containerHeight: number
};

type Props = {
  children: any,
  style: any,
  gutter: Gutter | number,
  transition: "fade" | "move" | "fadeMove" | false,
  transitionDuration: number,
  transitionStep: number,
  renderAfterImagesLoaded: boolean,
  renderOnEachImageLoad: boolean
};

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
  stoneNodes: Array<HTMLElement>;
  setRef: (ref: HTMLElement | null) => void;
  firstRender: boolean;
  loadingImagesIndexes: number[] = [];

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

  constructor(props: any) {
    super(props);

    this.setRef = ref => {
      this.node = ref;
    };

    this.firstRender = true;
    this.stoneNodes = [];
  }

  componentDidMount() {
    if (!this.areImagesLoading()) {
      this.placeStones();
    }
    this.firstRender = false;
  }

  handleStoneLoad = (child, index) => event => {
    this.loadingImagesIndexes = this.loadingImagesIndexes.filter(i => i !== index);

    requestAnimationFrame(this.checkIfImagesAreLoading);

    if (child.props.onLoad) {
      child.props.onLoad(event);
    }
  }

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

  setStoneRef = index => ref => this.stoneNodes[index] = ref

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

    if (
      (this.props.renderOnEachImageLoad || this.props.renderAfterImagesLoaded)
        &&
      child.type === "img"
    ) {
      stoneProps.onLoad = this.handleStoneLoad(child, index);
    }

    return React.cloneElement(child, {
      ...child.props,
      ...stoneProps
    });
  }

  renderStones() {
    return this.props.children.map(this.renderStone);
  }

  addImageToLoadingList(index) {
    this.loadingImagesIndexes.push(index);
  }

  areImagesLoading(): boolean {
    return !!this.loadingImagesIndexes.length;
  }

  checkIfImagesAreLoading = () => {
    if (this.props.renderAfterImagesLoaded && !this.areImagesLoading()) {
      this.placeStones();
    } else {
      this.placeStones();
    }
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
        {this.renderStones()}
      </div>
    );
  }
}

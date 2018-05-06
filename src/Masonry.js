// @flow

import React, { Component } from "react";
import placeStones from "./utils/placeStones";
import normalizeGutter from "./utils/normalizeGutter";
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
  transition: "fade" | "move" | "fadeMove" | boolean,
  renderAfterImagesLoaded: boolean
};

class Masonry extends Component<Props, State> {
  node: HTMLElement | null;
  stoneNodes: Array<HTMLElement>;
  setRef: (ref: HTMLElement | null) => void;
  firstRender: boolean;
  imageItemsNo: number;
  stones = [];
  stones: Stone[];

  state = {
    positions: [],
    availableSpots: [],
    containerHeight: 0
  };

  static defaultProps = {
    gutter: 10,
    transition: false,
    renderAfterImagesLoaded: true
  };

  constructor(props: any) {
    super(props);

    this.setRef = (ref) => {
      this.node = ref;
    };

    this.firstRender = true;
    this.stoneNodes = [];
  }

  componentDidMount() {
    this.placeStones();
    this.firstRender = false;
  }

  getStones(): Array<Stone> {
    return this.stoneNodes.map(stone => ({
      width: stone.offsetWidth,
      height: stone.offsetHeight,
    }));
  }

  placeStones() {
    if (this.node === null) {
      return;
    }
    const containerSize = this.node.offsetWidth;
    const stones = this.getStones();
    const gutter = normalizeGutter(this.props.gutter);

    const { positions, containerHeight } = placeStones({
      containerSize,
      stones,
      gutter
    });

    this.setState({
      positions,
      containerHeight
    });
  }

  getPositionStyle(index: number) {
    let positionStyle;
    if (this.state.positions) {
      positionStyle = this.state.positions[index];
    }
    if (positionStyle) {
      positionStyle = { ...positionStyle, opacity: 1 };
    } else {
      positionStyle = {
        opacity: 0
      };
    }

    return positionStyle;
  }

  renderStones() {
    // keep refs
    return [...this.props.children].map((child, index) => {
      const positionStyle = this.getPositionStyle(index);
      const style = {
        ...child.props.style,
        position: "absolute",
        ...positionStyle
      };
      return React.cloneElement(child, {
        ref: ref => {
          this.stoneNodes[index] = ref;
        },
        style
      });
    });
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          position: "relative",
          minHeight: this.state.containerHeight
        }}
        ref={this.setRef}
      >
        {this.renderStones()}
      </div>
    );
  }
}

export default Masonry;

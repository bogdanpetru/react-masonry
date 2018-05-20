// @flow

import React, { Component } from "react";
// import placeStones from "./utils/placeStones";
import placeStone from "./utils/placeStone";
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

type PositionHistory = {
  positions: Position[][],
  availableSpots: Spot[][],
  containerHeight: number[]
};

function placeStones({
  stones,
  containerSize,
  gutter
}: {
  stones: Stone[],
  containerSize: number,
  gutter: Gutter
}): PositionHistory {
  // it is calculated on each stone placement
  let containerHeight = 0;
  const history = {
    positions: [],
    containerHeight: [],
    availableSpots: []
  };
  if (!stones.length) {
    return history;
  }

  const positions = [];

  let availableSpots = [
    {
      top: 0,
      left: 0,
      right: containerSize,
      bottom: null
    }
  ];

  for (let i = 0, len = stones.length; i < len; i += 1) {
    let stone = stones[i];
    if (gutter) {
      stone = {
        width: stone.width + gutter.left + gutter.right,
        height: stone.height + gutter.top + gutter.bottom
      };
    }

    const { position, availableSpots: newAvailableSpots } = placeStone({
      availableSpots,
      stone,
      containerSize
    });

    let newPosition = { ...position };
    if (gutter) {
      newPosition = {
        top: position.top + gutter.top,
        left: position.left + gutter.left
      };
    }
    positions.push(newPosition);
    availableSpots = newAvailableSpots;
    if (position.top + stone.height > containerHeight) {
      containerHeight = position.top + stone.height;
    }

    history.positions.push([...positions]);
    history.availableSpots.push([...availableSpots]);
    history.containerHeight.push(containerHeight);
  } //  end of loop

  // return { positions, containerHeight };
  return history;
}

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
    renderAfterImagesLoaded: true,
    showAvailableSPots: false // internal
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
    this.placeStones();
    this.firstRender = false;
  }

  getStones(): Array<Stone> {
    return this.stoneNodes.map(stone => ({
      width: stone.offsetWidth,
      height: stone.offsetHeight
    }));
  }

  placeStones() {
    if (this.node === null) {
      return;
    }
    const containerSize = this.node.offsetWidth;
    const stones = this.getStones();
    const gutter = normalizeGutter(this.props.gutter);

    const history = placeStones({
      containerSize,
      stones,
      gutter
    });

    this.loadStones(history, stones.length - 1);
  }

  loadStones(history: PositionHistory, index: number) {
    const positions = history.positions[index];
    const containerHeight = history.containerHeight[index];
    const availableSpots = history.availableSpots[index];

    this.setState({
      positions,
      containerHeight,
      availableSpots
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

  remderAvailableSpots() {
    const { availableSpots } = this.state;
    return availableSpots.map(spot => (
      <div
        style={{
          zIndex: 3000,
          position: "absolute",
          border: "3px solid yellow",
          background: "rgba(255, 0, 0, 0.3)",
          top: spot.top,
          left: spot.left,
          height: `${this.getHeight(spot)}px`,
          right: this.getContainerWidth() - spot.right
        }}
      >
        {JSON.stringify(spot)}
      </div>
    ));
  }

  getContainerWidth(): number {
    return this.node ? this.node.offsetWidth : 0;
  }

  getContainerHeight(): number {
    return this.node ? this.node.offsetHeight : 0;
  }

  getHeight(spot: any): number {
    return spot.bottom
      ? spot.bottom - spot.top
      : this.state.containerHeight - spot.bottom;
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
        {this.props.showAvailableSPots && this.renderAvialableSpots()}
      </div>
    );
  }
}

export default Masonry;

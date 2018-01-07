// @flow

import React, { Component } from 'react';
import placeStones from './utils/placeStones';
import placeStone from './utils/placeStone';
import normalizeGutter from './utils/normalizeGutter';
import type { Position, Stone, Gutter } from './utils/types';


class Masonry extends Component {
  constructor(props: any) {
    super(props);

    this.setRef = (ref = null) => {
      this.node = ref;
    };

    this.firstRender = true;
  }

  node: HTMLElement | null;
  stoneNodes: Array<HTMLElement>;
  setRef: () => void;
  firstRender: boolean;
  imageItemsNo: number;  

  state = {
    loaded: {},
    positions: [],
    containerHeight: 0,
  };

  state: {
    loaded: any,
    positions: Position[] | null,
    availableSpots: [
      {
        top: 0,
        left: 0,
        right: containerSize,
        bottom: null,
      },
    ]
  };

  static defaultProps = {
    gutter: 10,
    transition: false,
    renderAfterImagesLoaded: true,
  };

  props: {
    children: any,
    style: {},
    gutter: Gutter | number,
    transition: 'fade' | 'move' | 'fadeMove' | boolean,
    renderAfterImagesLoaded: boolean,
  };

  stones = [];
  stones: Stone[];

  componentDidMount() {
    const stones = this.getStones();
    this.placeStones(stones);
    this.firstRender = false;
  }

  getStones() {
    return this.stoneNodes.map(stone => ({
      width: stone.offsetWidth,
      height: stone.offsetHeight,
    }));
  }

  // placeStones() {
  //   if (this.node === null) {
  //     return;
  //   }
 
  //   const { positions, containerHeight } = placeStones({
  //     containerSize,
  //     stones,
  //     gutter,
  //   });

  //   this.setState({
  //     positions,
  //     containerHeight,
  //   });
  // }


  placeStones(stones, index = 0 ) {
    const containerSize = this.node.offsetWidth;
    const { availableSpots } = this.state;
    const gutter = normalizeGutter(this.props.gutter);

    //  it is calculated on each stone placement
    let containerHeight = 0;
    if (!stones.length) {
      return null;
    }

    const positions = [];

    let stone = stones[index];
    if (gutter) {
      stone = {
        width: stone.width + gutter.left + gutter.right,
        height: stone.height + gutter.top + gutter.bottom,
      };
    }

      const {
        position,
        availableSpots: newAvailableSpots,
    } = placeStone({
          availableSpots,
          stone,
          containerSize,
      });

      let newPosition = { ...position };
      if (gutter) {
        newPosition = {
          top: position.top + gutter.top,
          left: position.left + gutter.left,
        };
      }

      if (position.top + stone.height > containerHeight) {
        containerHeight = position.top + stone.height;
      }
    } //  end of loop

    // return { positions, containerHeight };  

    this.setState({
      availableSpots: newAvailableSpots,
      positions: [this.state.positions, newPosition]
    }, () => {
      if ((index + 1) < stones.length) {
        requestAnimationFrame(() => {
          this.placeStones(stones, index + 1);
        });
      }
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
        opacity: 0,
      };
    }

    return positionStyle;
  }

  renderStones() {
    // keep refs
    this.stoneNodes = [];
    return [...this.props.children].map((child, index) => {
      const positionStyle = this.getPositionStyle(index);
      const style = {
        ...child.props.style,
        position: 'absolute',
        ...positionStyle,
      };
      return React.cloneElement(child, {
        ref: (ref) => {
          this.stoneNodes[index] = ref;
        },
        style
      });
    });
  }

  render() {
    return (
      <div style={{ ...this.props.style, position: 'relative', minHeight: this.state.containerHeight }} ref={this.setRef}>
        {this.renderStones()}
      </div>
    );
  }
}

export default Masonry;
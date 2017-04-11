// @flow

import React, { Component } from 'react';
import placeStones from '../utils/placeStones';
import type { Position, Stone } from '../utils/types';

class Masonry extends Component {
  constructor(props) {
    super(props);

    this.setRef = (ref) => {
      this.node = ref;
    };
  }

  state = {
    loaded: {},
    positions: [],
  };

  state: {
    loaded: any,
    positions: Position[],
  };

  props: {
    style: object,
    children: any,
  };

  stones = [];
  stones: Stone[];

  componentDidMount() {
    this.placeStones();
  }

  placeStones() {
    const containerSize = this.node.offsetWidth;
    const stones = this.stones.map(stone => ({
      width: stone.offsetWidth,
      height: stone.offsetHeight,
    }));

    const positions = placeStones({
      containerSize,
      stones,
    });

    this.setState({
      positions,
    });
  }

  getPositionStyle(index: number) {
    let positionStyle;
    if (this.state.positions) {
      positionStyle = this.state.positions[index];
    }
    if (positionStyle) {
      positionStyle = { ...positionStyle, opacity: 1 };
    }

    return positionStyle;
  }

  handleImageLoad(index: number) {
    // after each image reposition stones
    this.placeStones();
    this.setState(prevState => ({
      ...prevState,
      loaded: {
        ...prevState.loaded,
        [index]: true,
      },
    }));
  }

  renderStones() {
    // keep refs
    this.stones = [];
    return [...this.props.children].map((child, index) => {
      const positionStyle = this.getPositionStyle(index);

      // if an image add onLoad
      let visibilityStyle;
      let imageLoadHandler = null;
      if (child.type === 'img') {
        imageLoadHandler = {
          onLoad: (event) => {
            this.handleImageLoad(index);
            if (typeof child.props.onLoad === 'function') {
              child.props.onLoad(event);
            }
          },
        };
      }

      const style = {
        ...child.props.style,
        position: 'absolute',
        ...positionStyle,
        ...visibilityStyle,
      };

      return React.cloneElement(child, {
        ref: (ref) => {
          this.stones[index] = ref;
        },
        style,
        ...imageLoadHandler,
      });
    });
  }

  render() {
    return (
      <div style={{ ...this.props.style, position: 'relative' }} ref={this.setRef}>
        {this.renderStones()}
      </div>
    );
  }
}

export default Masonry;

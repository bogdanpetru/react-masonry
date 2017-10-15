// @flow

import React, { Component } from 'react';
import placeStones from '../utils/placeStones';
import normalizeGutter from '../utils/normalizeGutter';
import type { Position, Stone, Gutter } from '../utils/types';

/**
 * Transition.
 * If enabled on first render has the apropriate inline css.
 */

const initialFadeTransitionStyle = {
  transition: '300ms opacity ease',
  opacity: 0,
}

const finalFadeTransitionStyle = {
  transition: '300ms opacity ease',
  opacity: 1,  
}

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

  state = {
    loaded: {},
    positions: [],
    containerHeight: 0,
  };

  state: {
    loaded: any,
    positions: Position[] | null,
  };

  static defaultProps = {
    gutter: 10,
    transition: 'fade',
  };

  props: {
    children: any,
    style: {},
    gutter: Gutter | number,
    transition: 'fade' | 'move' | 'fadeMove' | boolean,
  };

  stones = [];
  stones: Stone[];

  componentDidMount() {
    this.placeStones();
    this.firstRender = false;
  }

  getStones() {
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
      gutter,
    });

    this.setState({
      positions,
      containerHeight,
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
    this.stoneNodes = [];
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

      const { transition } = this.props;
      let transitionStyle = {};
      if (transition) {
        if (transition === 'fade') {
          transitionStyle = this.firstRender ? 
            initialFadeTransitionStyle : 
            finalFadeTransitionStyle
        } 
      }

      const style = {
        ...child.props.style,
        position: 'absolute',
        ...positionStyle,
        ...visibilityStyle,
        ...transitionStyle,
      };

      if (this.props.transition === 'fade' || this.props.transition === 'fadeMove') {
        style.transition = '300ms opacity ease';
      }

      return React.cloneElement(child, {
        ref: (ref) => {
          this.stoneNodes[index] = ref;
        },
        style,
        ...imageLoadHandler,
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

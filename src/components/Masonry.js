import React, { PropTypes as t } from 'react';
import placeStones from '../utils/placeStones';

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: {} };

    this.setRef = ref => {
      this.node = ref;
    };
  }

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

  handleImageLoad(index) {
    this.placeStones();
    console.log('index', index);
    this.setState(prevState => ({
      ...prevState,
      loaded: {
        ...prevState.loaded,
        [index]: true,
      },
    }));
  }

  renderStones() {
    this.stones = [];
    return [...this.props.children].map((child, index) => {
      let positionStyle;
      if (this.state.positions) {
        positionStyle = this.state.positions[index];
      }
      if (positionStyle) {
        positionStyle = { ...positionStyle, opacity: 1 };
      }

      // if an image add onLoad
      let visibilityStyle;
      let imageLoadHandler = null;
      if (child.type === 'img') {
        imageLoadHandler = {
          onLoad: event => {
            this.handleImageLoad(index);
            if (child.props.onLoad) {
              child.props.onLoad(event);
            }
          },
        };
        if (!this.state.loaded[index]) {
          // visibilityStyle = { visibility: 'hidden' };
        }
      }

      const style = {
        ...child.props.style,
        position: 'absolute',
        ...positionStyle,
        ...visibilityStyle,
      };

      return React.cloneElement(child, {
        ref: ref => {
          this.stones[index] = ref;
        },
        style,
        ...imageLoadHandler,
      });
    });
  }

  renderAvailableSpots() {
    const maxWidth = this.node && this.node.offsetWidth;
    if (!maxWidth) {
      return null;
    }

    const spots = this.state.availableSpots || [
      {
        top: 0,
        left: 0,
        right: 0,
        botttom: 0,
      },
    ];

    return spots.map(spot => {
      const right = maxWidth - spot.right;
      const style = {
        ...spot,
        position: 'absolute',
        opacity: 0.8,
        border: '1px solid #9c9cff',
        zIndex: 10,
        background: '#d9d9ff',
        bottom: 0,
        right,
      };

      return <div className="spot" style={style} />;
    });
  }

  render() {
    return (
      <div
        style={{ ...this.props.style, position: 'relative' }}
        ref={this.setRef}>
        {this.renderStones()}
      </div>
    );
  }
}

Masonry.propTypes = {};

export default Masonry;

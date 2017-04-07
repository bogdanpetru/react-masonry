import React, { PropTypes as t } from 'react';
import placeStone from '../utils/placeStone';

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setRef = ref => {
      this.node = ref;
    };
  }

  componentDidMount() {
    this.placeStones();
  }

  placeStones() {
    const availableSpots = [
      { top: 0, left: 0, right: this.node.offsetWidth, bottom: null },
    ];

    this.placeStone({ stones: this.stones, availableSpots });
  }

  // make it recursive
  placeStone({ stones, availableSpots }) {
    if (!stones.length) {
      return;
    }
    const realIndex = this.stones.length - stones.length;
    const stone = stones[0];

    if (stone.tagName === 'IMG' && !this.stone.loaded[realIndex]) {
      return;
    }

    const stoneSize = {
      width: stone.offsetWidth,
      height: stone.offsetHeight,
    };

    const {
      position,
      availableSpots: newAvailableSpots,
    } = placeStone({
      availableSpots,
      stone: stoneSize,
      containerSize: this.node.offsetWidth,
    });

    this.setState({
      [`stone--${realIndex}`]: position,
      availableSpots: newAvailableSpots,
    });

    setTimeout(
      () => {
        this.placeStone({
          stones: stones.slice(1),
          availableSpots: newAvailableSpots,
        });
      },
      100,
    );
  }

  handleImageLoad(index) {
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
      let positionStyle = this.state[`stone--${index}`];
      if (positionStyle) {
        positionStyle = { ...positionStyle, opacity: 1 };
      }

      // if an image add onLoad
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
      }

      return React.cloneElement(child, {
        ref: ref => {
          this.stones[index] = ref;
        },
        style: { ...child.props.style, position: 'absolute', ...positionStyle },
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

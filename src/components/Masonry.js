import React from 'react';
import placeStone from '../utils/placeStone';

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.stones.forEach(stone => {
      stone.style.opacity = 0;
    });
    this.placeStones();
  }

  render() {
    return (
      <div
        style={{ ...this.props.style, position: 'relative' }}
        ref={ref => this.node = ref}>
        {this.renderStones()}
        {this.renderAvailableSpots()}
      </div>
    );
  }

  placeStones() {
    let availableSpots = [
      { top: 0, left: 0, right: this.node.offsetWidth, bottom: null },
    ];

    this.placeStone({ stones: this.stones, availableSpots });
  }

  // make it recursive
  placeStone({ stones, availableSpots }) {
    if (!stones.length) {
      return;
    }

    const stone = stones[0];
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

    const realIndex = this.stones.length - stones.length;
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
      2000,
    );
  }

  renderStones() {
    this.stones = [];
    return [...this.props.children].map((child, index) => {
      let positionStyle = this.state[`stone--${index}`];
      if (positionStyle) {
        positionStyle = { ...positionStyle, opacity: 1 };
      }

      return React.cloneElement(child, {
        key: index,
        ref: ref => this.stones[index] = ref,
        style: { ...child.props.style, position: 'absolute', ...positionStyle },
      });
    });
  }

  renderAvailableSpots() {
    const maxWidth = this.node && this.node.offsetWidth;
    if (!maxWidth) {
      return;
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
}

export default Masonry;

import React from 'react';
import placeStone from '../utils/placeStone';

class Masonry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.placeStones();
  }

  render() {
    return (
      <div
        style={{ ...this.props.style, position: 'relative' }}
        ref={ref => this.node = ref}>
        {this.renderStones()}
      </div>
    );
  }

  placeStones() {
    let availableSpots = [
      { top: 0, left: 0, right: this.node.offsetWidth, bottom: null },
    ];
    this.stones.forEach(stone => {
      const stoneSize = {
        width: stone.offsetWidth,
        height: stone.offsetHeight,
      };
      const {
        availableSpots: newAvailableSpots,
        position,
      } = placeStone({ availableSpots, stone: stoneSize });
      availableSpots = newAvailableSpots;
      console.log(position);

      stone.style.top = `${position.top}px`;
      stone.style.left = `${position.left}px`;
    });
  }

  renderStones() {
    this.stones = [];
    return [...this.props.children].map((child, index) => {
      return React.cloneElement(child, {
        key: index,
        ref: ref => this.stones[index] = ref,
        style: { ...child.props.style, position: 'absolute' },
      });
    });
  }
}

export default Masonry;

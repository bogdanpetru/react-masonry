import React from 'react'
import getPositions from '../utils/getPositions'

class Masonry extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dud: 'hello'
    }
  }
  render() {
    const boxes = [
      { width: 30, height: 30 }, // last
      { width: 25, height: 25 }, // 2nd
      { width: 25, height: 25 }, // 3rd
      { width: 20, height: 20 }, // first position

      // second row
      { width: 25, height: 30 }, // goes in 2 because it doesn't fit in fisrt
      { width: 20, height: 25 }, // goes in (4) first position
      { width: 25, height: 25 }, // goes in 3
      { width: 20, height: 20 }, // goes in (1) in last position
    ];

    return <div>
      dud
    </div>
  }
}

export default Masonry

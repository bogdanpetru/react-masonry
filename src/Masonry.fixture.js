import React from 'react';
import { Masonry } from './Masonry';

import {
  randomColor,
  common,
  titleStyle
} from './examples/RelativeWidthsExample';

const boxes = [
  { ...common, width: '30%', height: 200 },
  { ...common, width: '40%', height: 320 },
  { ...common, width: '30%', height: 250 },
  { ...common, width: '20%', height: 100 },
  { ...common, width: '50%', height: 120 },
  { ...common, width: '70%', height: 100 },
  { ...common, width: '20%', height: 200 },
  { ...common, width: '30%', height: 140 },
  { ...common, width: '25%', height: 200 },
  { ...common, width: '20%', height: 140 },
  { ...common, width: '40%', height: 180 },
  { ...common, width: '23%', height: 140 }
];

const children = boxes.map((box, index) => (
  <div key={index} style={{ ...box, backgroundColor: randomColor() }}>
    {`${box.width} - ${box.height}`}
    <div style={titleStyle}>{index}</div>
  </div>
));

export default {
  component: Masonry,
  props: {
    children
  }
};

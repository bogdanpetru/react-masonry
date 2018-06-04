import React from 'react';
import { Masonry } from '../Masonry';

export const common = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700
};

export const boxes = [
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

export const titleStyle = {
  position: 'absolute',
  left: 5,
  top: 5,
  fontWeight: '700',
  backgroundColor: '#333',
  color: '#fff',
  padding: 5
};

function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function random250() {
  return random(0, 255);
}

export function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`;
}

const App = () => (
  <Masonry
    gutter={{ bottom: 10, top: 10 }}
    style={{ border: '1px solid blue', height: 500 }}
    transition="move"
  >
    {boxes.map((box, index) => (
      <div key={index} style={{ ...box, backgroundColor: randomColor() }}>
        {`${box.width} - ${box.height}`}
        <div style={titleStyle}>{index}</div>
      </div>
    ))}
  </Masonry>
);

export default App;

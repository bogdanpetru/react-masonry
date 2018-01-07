import React from 'react';
import Masonry from '../Masonry';

const style = {
  width: '33.33%',
};

const common = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700
}

const boxes = [
  { ...common, width: '20%', height: 100 },
  { ...common, width: '20%', height: 200 },
  { ...common, width: '20%', height: 320 },
  { ...common, width: '20%', height: 250 },
  { ...common, width: '20%', height: 120 },
  { ...common, width: '20%', height: 100 },
  { ...common, width: '20%', height: 200 },
  { ...common, width: '20%', height: 140 },
  { ...common, width: '20%', height: 200 },
  { ...common, width: '20%', height: 140 },
  { ...common, width: '20%', height: 180 },
  { ...common, width: '20%', height: 140 },
]

function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

function random250() {
  return random(0, 255);
}

function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`;
}

const App = () => (
  <div>
    <h1></h1>
    <Masonry gutter={{ bottom: 10, top: 10 }} style={{ border: '1px solid blue', height: 500 }}>
      {boxes.map(
        (box, index) => (
          <div 
            key={index} 
            style={{...box, backgroundColor: randomColor()}}>
            {`${box.width} - ${box.height}`}
          </div>
        )
      )}
    </Masonry>
  </div>
);

export default App;
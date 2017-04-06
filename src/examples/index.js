import React from 'react';
import { render } from 'react-dom';
import Masonry from '../components/Masonry';

const box1Style = {
  width: 30,
  height: 40,
  background: '#e88d8d',
  boxSizing: 'border-box',
  border: '1px solid #333',
};

const App = () => {
  return (
    <div>
      <Masonry style={{ width: 200, border: '1px solid blue', height: 500 }}>
        <div style={{ ...box1Style, width: 60, height: 20 }}>1</div>
        <div style={{ ...box1Style, width: 33, height: 80 }}>2</div>
        <div style={{ ...box1Style, width: 44, height: 33 }}>3</div>
        <div style={{ ...box1Style, width: 11, height: 33 }}>4</div>
        <div style={{ ...box1Style, width: 33, height: 33 }}>3</div>

        <div style={{ ...box1Style, width: 66, height: 20 }}>1</div>
        <div style={{ ...box1Style, width: 12, height: 80 }}>2</div>
        <div style={{ ...box1Style, width: 35, height: 33 }}>3</div>
        <div style={{ ...box1Style, width: 12, height: 33 }}>3</div>
        <div style={{ ...box1Style, width: 50, height: 33 }}>4</div>

        <div style={{ ...box1Style, width: 30, height: 20 }}>1</div>
        <div style={{ ...box1Style, width: 77, height: 80 }}>2</div>
        <div style={{ ...box1Style, width: 44, height: 33 }}>3</div>
        <div style={{ ...box1Style, width: 22, height: 33 }}>3</div>
        <div style={{ ...box1Style, width: 88, height: 33 }}>4</div>

      </Masonry>
    </div>
  );
};

render(<App />, document.getElementById('main'));

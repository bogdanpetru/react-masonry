import React from 'react';
import { render } from 'react-dom';
import Masonry from '../components/Masonry';

const box1Style = {
  width: 30,
  height: 40,
  background: 'red',
  boxSizing: 'border-box',
  border: '1px solid #333',
};

const App = () => {
  return (
    <div>
      <Masonry style={{ width: 200, border: '1px solid blue', height: 500 }}>
        <div style={{ ...box1Style, width: 40, height: 50 }}>1</div>
        <div style={{ ...box1Style, width: 40, height: 50 }}>2</div>
        <div style={{ ...box1Style, width: 50, height: 50 }}>3</div>
        <div style={{ ...box1Style, width: 65, height: 50 }}>4</div>
        <div style={{ ...box1Style, width: 65, height: 50 }}>5</div>

      </Masonry>
    </div>
  );
};

render(<App />, document.getElementById('main'));

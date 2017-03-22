import React from 'react';
import { render } from 'react-dom';
import Masonry from '../components/Masonry';

const box1Style = {
  width: 30,
  height: 40,
  background: 'red',
  border: '1px solid blue',
};

const App = () => {
  return (
    <div>
      <Masonry style={{ width: 140 }}>
        <div style={box1Style} />
        <div style={{ ...box1Style, width: 40, height: 50 }} />
        <div style={box1Style} />
        <div style={box1Style} />
        <div style={{ ...box1Style, width: 40, height: 20 }} />
        <div style={box1Style} />
      </Masonry>
    </div>
  );
};

render(<App />, document.getElementById('main'));

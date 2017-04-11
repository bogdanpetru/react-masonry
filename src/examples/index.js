import React from 'react';
import { render } from 'react-dom';
import Masonry from '../components/Masonry';

import './index.css';

const style = {
  width: '33.33%',
};

const App = () => {
  return (
    <div>
      <h1>images</h1>
      <Masonry style={{ width: 500, border: '1px solid blue', height: 500 }}>
        <img style={{ width: 200 }} src="http://pipsum.com/435x800.jpg" />
        <img style={{ width: 190 }} src="http://pipsum.com/435x310.jpg" />
        <img style={{ width: 140 }} src="http://pipsum.com/435x500.jpg" />
        <img style={{ width: 90 }} src="http://pipsum.com/435x510.jpg" />
        <img style={{ width: 300 }} src="http://pipsum.com/435x310.jpg" />
        <img style={{ width: 160 }} src="http://pipsum.com/435x310.jpg" />
        <img style={{ width: 130 }} src="http://pipsum.com/435x210.jpg" />
      </Masonry>
    </div>
  );
};

render(<App />, document.getElementById('main'));

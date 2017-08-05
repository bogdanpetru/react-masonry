import React from 'react';
import { render } from 'react-dom';
import Masonry from '../components/Masonry';

import './index.css';

const style = {
  width: '33.33%',
};

const App = () => (
  <div>
    <h1>images</h1>
    <Masonry style={{ border: '1px solid blue' }}>
      <img style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/500x400.jpg" />
      <img style={{ width: 490 }} src="http://pipsum.com/600x470.jpg" />
      <img style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img style={{ width: 500 / 3 - 10 }} src="http://pipsum.com/150x200.jpg" />
      <img style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
    </Masonry>
  </div>
);

export default App;
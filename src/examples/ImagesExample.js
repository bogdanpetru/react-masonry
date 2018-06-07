import React from 'react';
import { Masonry } from '../Masonry';

const App = () => (
  <React.Fragment>
    <h1>Images</h1>
    <Masonry transition="fade" style={{ heiht: 700, border: '1px solid blue' }}>
      <img key="img1" style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img key="img2" style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/500x400.jpg" />
      <img key="img3" style={{ width: 490 }} src="http://pipsum.com/600x470.jpg" />
      <img key="img4" style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img key="img5" style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
      <img key="img6" style={{ width: 500 / 3 - 10 }} src="http://pipsum.com/150x200.jpg" />
      <img key="img7" style={{ width: 500 / 2 - 10 }} src="http://pipsum.com/600x400.jpg" />
    </Masonry>
  </React.Fragment>
);

export default App;
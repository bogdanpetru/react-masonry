import React from 'react';
import { render } from 'react-dom';

import './index.css';

import RelativeWidthsExample from './RelativeWidthsExample';
import ImagesExample from './ImagesExample';


const App = () => (
  <div className="root">
    <h1 className="title">
      React Masonry
    </h1>

    <div>
      <h2>Introduction</h2>

      <p>React Masonry, like <a target="_blank" href="https://github.com/desandro/masonry">Masonry but in React.</a></p>

      <p>
        Places stones (elements) in optimal positions by stacking them from left to right and from top to bottom.
      </p>

      <p>
        Elements rendered inside Masonry must be <a target="_blank" href="https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements">DOM elements</a>.
      </p>

      <p>
        Stacking process has the following steps:
      </p>
      <ul>
        <li>clone elements, save a reference (ref)</li>
        <li>render elements hidden, measure</li>
        <li>run position algorithm</li>
        <li>rerender elements with calculated position</li>
      </ul>
    </div>
    <h2>
      Api
    </h2>
    <p>
      See <a target="_blank" href="https://github.com/bogdanpetru/react-masonry">README.md</a>.
    </p>
    <h2>Examples</h2>

    <h3>Images</h3>
    <p>
      Images are placed after they are loaded.
    </p>
    {/* <ImagesExample /> */}

    <h3>Percent width:</h3>
    <RelativeWidthsExample />
  </div >
);

render(<App />, document.getElementById('main'));

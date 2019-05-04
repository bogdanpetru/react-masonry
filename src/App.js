import React, {useState} from "react";

import "./App.css";

import RelativeWidthsExample from "./examples/RelativeWidthsExample";

const options = [
  {
    id: "right-bottom",
    label: "right, bottom"
  },
  {
    id: "left-bottom",
    label: "left, bottom"
  },
  {
    id: "right-top",
    label: "right, top"
  },
  {
    id: "left-top",
    label: "left, top"
  }
];

const App = () => {
  const [numberOfBoxes, setCardsNumber] = useState(3);
  const [stacking, setStacking] = useState(3);

 return <div className="root">
    <h1 className="title">React Masonry</h1>

    <div>
      <h2>Introduction</h2>

      <p>
        ReactJs layout library inspired by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/desandro/masonry"
        >
          Masonry.
        </a>
      </p>

      <p>
        Places stones (elements) in optimal positions by stacking them from left
        to right and from top to bottom.
      </p>

      <p>
        Elements rendered inside Masonry must be{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements"
        >
          DOM elements
        </a>
        .
      </p>

      <p>Stacking process has the following steps:</p>
      <ul>
        <li>clone elements, save a reference (ref)</li>
        <li>render elements hidden, measure</li>
        <li>run position algorithm</li>
        <li>rerender elements with calculated position</li>
      </ul>
    </div>
    <h2>Api</h2>
    <p>
      See{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/bogdanpetru/react-masonry"
      >
        README.md
      </a>
      .
    </p>
    <h2>Examples</h2>
    <select onChange={(event) => setStacking(event.target.value)}>
      {options.map((item, key) => (
        <option value={item.id}>{item.label}</option>
      ))}
    </select>
    <input type="number" value={numberOfBoxes} onChange={(event) => setCardsNumber(event.target.value)} />
    <RelativeWidthsExample stacking={stacking} numberOfBoxes={numberOfBoxes} />
  </div>;
};


export default App;

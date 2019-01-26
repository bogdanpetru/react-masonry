import React from "react";
import { Masonry } from "../lib";

const common = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700
};

const boxes = [getBox()];

const titleStyle = {
  position: "absolute",
  left: 5,
  top: 5,
  fontWeight: "700",
  backgroundColor: "#333",
  color: "#fff",
  padding: 5
};

function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function random250() {
  return random(0, 255);
}

function getBox() {
  return {
    ...common,
    width: "20%",
    height: random(10, 300),
    backgroundColor: randomColor()
  };
}

function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`;
}

const App = ({ stacking, numberOfBoxes = 1 }) => {
  const numberOfBoxesInt = parseInt(numberOfBoxes, 10);

  if (numberOfBoxesInt > boxes.length) {
    boxes.push(getBox());
  }

  return (
    <Masonry style={{ height: 500 }} stacking={stacking} transition="fadeMove">
      {boxes.slice(0, numberOfBoxesInt).map((box, index) => (
        <div key={index} style={box}>
          {`${box.width} - ${box.height}`}
          <div style={titleStyle}>{index}</div>
        </div>
      ))}
    </Masonry>
  );
};

export default App;

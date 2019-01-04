/**
  getPositions returns positions considering only these two systems:

   +------------->   +------------>
   |                 |      d
   |                 |
   | d               |
   |                 |
   |                 |
   v                 v

  bottom - right and right - bottom


  From this system we can calculate the next ones.

  +-------------------------+
  | Stacking:               |   ^                  ^
  | top-right and right-top |   |d                 |
  |                         |   |                  |
  | left` = left            |   |                  |
  | bottom` = top           |   |                  |
  +-------------------------+   +-------------->   +--------------->
                                                        d
  +-------------------------+    <-----------+       <-----------+
  | Stacking:               |          d     |                   |
  | left-bottom and bottom-left |            |                   |
  |                         |                |                 d |
  | top` = top              |                |                   |
  | right` = left           |                |                   v
  +---------------+---------+                v

  +-------------------------+
  | Stacking:               |              ^                    ^
  | left-top and top-left   |              |                    |
  |                         |              |                 d  |
  | bottom` = top           |              |                    |
  | right` = left           |        d     |                    |
  +----------------+--------+   <----------+        <-----------+

  d = dominant
  first direction of stacking is dominant. First it stacks
  in that direction until it fits and it stacks in the next direction.
 */

function handleTopRight({ top, left, offset }) {
  return {
    offset,
    left,
    bottom: top
  };
}

function handleDownLeft({ top, left, offset }) {
  return {
    offset,
    top,
    right: left
  };
}

function handleTopLeft({ left, top, offset }) {
  return {
    offset,
    bottom: top,
    right: left
  };
}

const topRightPositions = {
  "top-right": true,
  "right-top": true,
  top: true // has same formula
};

const downLeftPositions = {
  "left-bottom": true,
  "bottom-left": true,
  left: true // has same formula
};

const topLeftPositions = {
  "top-left": true,
  "left-top": true
};

function translatePositions({ positions, stacking }) {
  let newPositions = positions;
  if (topRightPositions[stacking]) {
    newPositions = positions.map(handleTopRight);
  }

  if (downLeftPositions[stacking]) {
    newPositions = positions.map(handleDownLeft);
  }

  if (topLeftPositions[stacking]) {
    newPositions = positions.map(handleTopLeft);
  }

  return newPositions;
}

export { translatePositions };

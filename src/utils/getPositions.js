// @flow

type box = {
  width: number,
  height: number,
};

import getAvailablePositions from './getAvailablePositions';

function getPositions({ boxes, width }: { boxes: box[], width: number }) {
  // position first row
  const intermediarPositions = boxes.reduce(
    (acc, item) => {
      /**
       * each row will have it's own array
       * this way is easy to keep track
       */
      // must not do this for first row
      if (acc.currentLeft + item.width > width) {
        acc.positions.push([]);
        // must rate the positions by hight
      }

      // do this only for rows greater than 1
      if (acc.positions.length > 1) {
        // gets previous row, it must be calculated for each
        const availablePositions = getAvailablePositions({
          // item, as one by one available positions are ocupied
          previousRow: acc.positions[acc.positions.length - 2],
          currentRow: acc.positions[acc.positions.length - 1],
        });
      }

      acc.positions[acc.positions.length - 1].push({
        top: acc.currentTop,
        left: acc.currentLeft,
        bottom: acc.currentTop + item.hegiht,
        right: acc.currentLeft + item.width,
      });
      acc.currentLeft = acc.currentLeft + item.width;

      return acc;
    },
    {
      currentLeft: 0,
      currentTop: 0,
      // each row will have it's own array
      positions: [[]],
      /**
       * keep information about the previous row, or rows
       * that have available positions, they are in order or magnitude
       * the most shallow one (biggest hole)
       * a position should be describe:
       * {
       *  top,
          left,
          right,
          bottom,  - see algorithm.md at step 4, box number 4 has a position like this
       *  }
      */
      availablePositions: [],
    },
  );

  // reduce back to one big array
  return intermediarPositions.positions.reduce(
    (acc, row) => {
      return [...acc, ...row];
    },
    [],
  );
}

export default getPositions;

// @flow
import getAvailablePositions from './getAvailablePositions';

type box = {
  width: number,
  height: number,
};

function getPositions({ boxes, width }: { boxes: box[], width: number }) {
  // position first row
  const intermediarPositions = boxes.reduce(
    (acc, item) => {
      /**
       * each row will have it's own array
       * this way is easy to keep track
       */

      // new row
      if (acc.currentLeft + item.width > width) {
        acc.positions.push([]);
        // TODO handle edge case in which
        // there is a space left
      }

      // first row
      if (acc.positions.length === 1) {
        acc.positions[acc.positions.length - 1].push({
          top: acc.currentTop,
          left: acc.currentLeft,
          bottom: acc.currentTop + item.height,
          right: acc.currentLeft + item.width,
        });
        acc.currentLeft = acc.currentLeft + item.width;

        return acc;
      }

      // gets previous row, it must be calculated for each
      // use available postions as a queue
      if (!acc.availablePositions) {
        acc.availablePositions = getAvailablePositions({
          // item, as one by one available positions are ocupied
          previousRow: acc.positions[acc.positions.length - 2],
          currentRow: acc.positions[acc.positions.length - 1],
        });

        acc.availablePositions = availablePositions;
      }

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

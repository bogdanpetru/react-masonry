// @flow
import { filter } from 'ramda'
import getAvailableSpots from './getAvailableSpots';
import getOptimalSpot from './getOptimalSpot';
import { box } from './types';

function getPositions({ boxes, width }: { boxes: box[], width: number }) {
  // position first row
  const intermediarPositions = boxes.reduce(
    (acc, box) => {
      /**
       * each row will have it's own array
       * this way is easy to keep track
       */

      // new row
      if (acc.currentLeft + box.width > width) {
        acc.currentLeft = 0
        acc.positions = [...acc.positions, []]
      }

      // first row
      if (acc.positions.length === 1) {
        acc.positions[0].push({
          top: acc.currentTop,
          left: acc.currentLeft,
          bottom: acc.currentTop + box.height,
          right: acc.currentLeft + box.width,
        });

        acc.currentLeft = acc.currentLeft + box.width;
        return acc;
      }

      const previousRow = acc.positions[acc.positions.length - 2]
      // get availableSpots
      if (0 === acc.availableSpots.length) {
        acc.availableSpots = getAvailableSpots({
          previousRow,
          currentRow: [],
        })
      }

      const optimalSpot = getOptimalSpot({
        box,
        availableSpots: acc.availableSpots,
      })

      acc.positions[acc.positions.length - 1].push({
        top: optimalSpot.top,
        left: optimalSpot.left,
        right: optimalSpot.right,
        bottom: null
      })

      // remove use spot
      acc.availableSpots = filter((spot) => spot !== optimalSpot, acc.availableSpots)

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
      availableSpots: [],
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

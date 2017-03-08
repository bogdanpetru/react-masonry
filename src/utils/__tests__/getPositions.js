import getPositions from '../getPositions';

function restrictToLeftAndRight(item) {
  return {
    // I only care about top and right,
    // the positions will also have bottom and right
    top: item.top,
    left: item.left,
  };
}

describe('getPositions', () => {
  describe('optimal sizes, all of them fit in the row', () => {
    test('should position first row correct', () => {
      const boxes = [
        { width: 30, height: 30 },
        { width: 25, height: 25 },
        { width: 25, height: 25 },
        { width: 20, height: 20 },
      ];
      const width = 100;
      const expected = [
        { top: 0, left: 0 },
        { top: 0, left: 30 },
        { top: 0, left: 55 },
        { top: 0, left: 80 },
      ];
      expect(
        getPositions({ boxes, width }).map(restrictToLeftAndRight),
      ).toEqual(expected);
    });

    test('should position second row correct', () => {
      const boxes = [
        { width: 30, height: 30 }, // last
        { width: 25, height: 25 }, // 2nd
        { width: 25, height: 25 }, // 3rd
        { width: 20, height: 20 }, // first position

        // second row
        { width: 25, height: 30 }, // goes in 2 because it doesn't fit in fisrt
        { width: 20, height: 25 }, // goes in (4) first position
        { width: 25, height: 25 }, // goes in 3
        { width: 20, height: 20 }, // goes in (1) in last position
      ];

      const expected = [
        { top: 0, left: 0 },
        { top: 0, left: 30 },
        { top: 0, left: 55 },
        { top: 0, left: 80 },

        // second row
        { top: 25, left: 30 },
        { top: 20, left: 80 },
        { top: 25, left: 55 },
        { top: 30, left: 0 },
      ];
      const width = 100;
      expect(
        getPositions({ boxes, width }).map(restrictToLeftAndRight),
      ).toEqual(expected);
    });
  });

  xtest('should return correct positions on two rows', () => {
    const boxes = [
      { width: 3, height: 3 }, // 1
      { width: 4, height: 2 }, // 2
      { width: 4, height: 4 }, // 3
      { width: 5, height: 2 }, // 4
      { width: 4, height: 3 }, // 5
      { width: 5, height: 1 }, // 6
      { width: 3, height: 3 }, // 7
      { width: 4, height: 2 }, // 8
      { width: 3, height: 2 }, // 9
    ];
    const expected = [
      { left: 0, top: 0 }, // 1
      { left: 3, top: 0 }, // 2
      { left: 7, top: 0 }, // 3
      { left: 10, top: 0 }, // 4
      { left: 3, top: 2 }, // 5
      { left: 10, top: 2 }, // 6
      { left: 0, top: 3 }, // 7
      { left: 10, top: 3 }, // 8
      { left: 7, top: 5 }, // 9
    ];
    const width = 15;
    expect(getPositions({ boxes, width })).toEqual(expected);
  });
});

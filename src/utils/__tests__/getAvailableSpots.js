import getAvailableSpots from '../getAvailableSpots';

describe('getAvailableSpots', () => {
  test('should return positions in correct order', () => {
    const previousRow = [
      { top: 0, left: 0, bottom: 30, right: 30 }, // 4
      { top: 0, left: 30, bottom: 25, right: 55 }, // 3
      { top: 0, left: 55, bottom: 25, right: 80 }, // 2
      { top: 0, left: 80, bottom: 20, right: 100 }, // 1
    ];
    const currentRow = [];
    const expected = [
      { top: 20, left: 80, right: 100, bottom: null },
      { top: 25, left: 55, right: 80, bottom: null },
      { top: 25, left: 30, right: 55, bottom: null },
      { top: 30, left: 0, right: 30, bottom: null },
    ];
    expect(getAvailableSpots({ previousRow, currentRow })).toEqual(expected);
  });
});

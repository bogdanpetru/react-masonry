import getOptimalPosition from '../getOptimalPosition';

describe('getOptimalPosition', () => {
  test('should return the optimal position', () => {
    const availablePositions = [
      { top: 20, left: 80, right: 100, bottom: null },
      { top: 25, left: 55, right: 80, bottom: null },
      { top: 25, left: 30, right: 55, bottom: null },
      { top: 30, left: 0, right: 30, bottom: null }, // fits here
    ];
    const expected = { top: 30, left: 0, right: 30, bottom: null };
    const box = { width: 30, height: 20 };
    expect(getOptimalPosition({ availablePositions, box })).toEqual(expected);
  });
});

import getOptimalSpot from '../getOptimalSpot';

describe('getOptimalSpot', () => {
  test('should return the optimal position', () => {
    const availableSpots = [
      { top: 20, left: 80, right: 100, bottom: null },
      { top: 25, left: 55, right: 80, bottom: null },
      { top: 25, left: 30, right: 55, bottom: null },
      { top: 30, left: 0, right: 30, bottom: null }, // fits here
    ];
    const box = { width: 30, height: 20 };
    const expected = { top: 30, left: 0, right: 30, bottom: null };
    expect(getOptimalSpot({ availableSpots, box })).toEqual(expected);
  });
});

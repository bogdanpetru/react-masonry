import { getOptimalSpot } from '../getOptimalSpot';

describe('getOptimalSpot', () => {
  it(`
      when there is no spot, stone must be positioned
      with left 0 and top to the tallest top spot
    `, () => {
    const stone = { width: 70, height: 90 };
    const availableSpots = [
      { left: 30, top: 0, right: 100, bottom: null },
      { left: 0, top: 0, right: 100, bottom: null },
    ];
  });
});

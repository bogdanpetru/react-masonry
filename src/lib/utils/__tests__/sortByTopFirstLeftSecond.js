import { sortByTopFirstLeftSecond } from '../sortByTopFirstLeftSecond';

describe('sortByTopFirstLeftSecond', () => {
  it('should sort first by top and then by left, when top is the same', () => {
    const list = [
      { top: 10, left: 10 },
      { top: 10, left: 5 },
      { top: 10, left: 0 },
    ];
    expect(sortByTopFirstLeftSecond(list)).toEqual([
      { top: 10, left: 0 },
      { top: 10, left: 5 },
      { top: 10, left: 10 },
    ]);
  });
  it('should sort first by top and then by left, when top is the same', () => {
    const list = [
      { top: 250, left: 0 },
      { top: 150, left: 65 },
      { top: 200, left: 65 },
      { top: 100, left: 50 },
      { top: 0, left: 40 },
      { top: 50, left: 40 },
    ];
    expect(sortByTopFirstLeftSecond(list)).toEqual([
      { top: 0, left: 40 },
      { top: 50, left: 40 },
      { top: 100, left: 50 },
      { top: 150, left: 65 },
      { top: 200, left: 65 },
      { top: 250, left: 0 },
    ]);
  });
});

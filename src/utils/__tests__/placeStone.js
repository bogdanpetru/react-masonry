import placeStone from '../placeStone';

describe('placeStone', () => {
  it('should place first stone correct', () => {
    const stone = { width: 50, height: 50 };
    const availableSpots = [{ top: 0, left: 0, right: 100, bottom: null }];
    const expected = {
      position: { top: 0, left: 0 },
      availableSpots: [
        { top: 0, left: 50, right: 100, bottom: null },
        { top: 50, left: 0, right: 100, bottom: null },
      ],
    };
    const containerSize = 100;
    expect(
      placeStone({
        stone,
        availableSpots,
        containerSize,
      }),
    ).toEqual(expected);
  });
  it('should place the 2nd stone correct', () => {
    const stone = { width: 30, height: 30 };
    const availableSpots = [
      { top: 0, left: 50, right: 100, bottom: null },
      { top: 50, left: 0, right: 100, bottom: null },
    ];
    const expected = {
      position: { top: 0, left: 50 },
      availableSpots: [
        { top: 0, left: 80, right: 100, bottom: null },
        { top: 30, left: 50, right: 100, bottom: null },
        { top: 50, left: 0, right: 100, bottom: null },
      ],
    };
    const containerSize = 100;
    expect(
      placeStone({
        stone,
        availableSpots,
        containerSize,
      }),
    ).toEqual(expected);
  });
  it('sould place second stone correct, when the stone fill the entire available space', () => {
    const stone = { width: 50, height: 30 };
    const availableSpots = [
      { top: 0, left: 50, right: 100, bottom: null },
      { top: 50, left: 0, right: 100, bottom: null },
    ];
    const expected = {
      position: { top: 0, left: 50 },
      availableSpots: [
        { top: 30, left: 50, right: 100, bottom: null },
        { top: 50, left: 0, right: 100, bottom: null },
      ],
    };
    const containerSize = 100;
    expect(
      placeStone({
        stone,
        availableSpots,
        containerSize,
      }),
    ).toEqual(expected);
  });
  it('should place first stone on second row correct', () => {
    const stone = { width: 30, height: 30 };
    const availableSpots = [
      { top: 9, left: 80, right: 100, bottom: null },
      { top: 10, left: 0, right: 50, bottom: null },
      { top: 20, left: 50, right: 100, bottom: null },
    ];
    const expected = {
      position: { top: 10, left: 0 },
      availableSpots: [
        { top: 9, left: 80, right: 100, bottom: null },
        { top: 10, left: 30, right: 50, bottom: null },
        { top: 20, left: 50, right: 100, bottom: null },
        { top: 40, left: 0, right: 100, bottom: null },
      ],
    };
    const containerSize = 100;

    const result = placeStone({
      stone,
      availableSpots,
      containerSize,
    });
    expect(result.position).toEqual(expected.position);
    expect(result.availableSpots).toEqual(expected.availableSpots);
  });
  it(`
    should place first stone on second row correct,
     the optimal place is not the first and invalidates other available spaces
    `, () => {
    const stone = { width: 20, height: 30 };
    const availableSpots = [
      { top: 9, left: 80, right: 100, bottom: null },
      { top: 10, left: 0, right: 50, bottom: null },
      { top: 20, left: 50, right: 100, bottom: null },
    ];
    const expected = {
      position: { top: 9, left: 80 },
      availableSpots: [
        { top: 10, left: 0, right: 50, bottom: null },
        { top: 20, left: 50, right: 80, bottom: null },
        { top: 39, left: 80, right: 100, bottom: null },
      ],
    };
    const containerSize = 100;

    const result = placeStone({
      stone,
      availableSpots,
      containerSize,
    });
    expect(result.position).toEqual(expected.position);
    expect(result.availableSpots[0]).toEqual(expected.availableSpots[0]);
    expect(result.availableSpots[1]).toEqual(expected.availableSpots[1]);
    expect(result.availableSpots[2]).toEqual(expected.availableSpots[2]);
  });
  it('should invalidate bottom of a spot if a stone is paced above it', () => {
    /**
    100
      +--------------------------------------------+
      |--------------------------------+           |
      ||             ||                |           |
      ||             ||                |           |
      ||   30x30     ||  30x20         |           |
      ||             ||                |           |
      ||             +-----------------+           |
      |--------------+                             |
      |--------------------------------------------+
      ||                                          ||
      ||                                          ||
      ||        100x20                            ||
      ||                                          ||
      ||                                          ||
      ||                                          ||
      ||                                          ||
      +--------------------------------------------+
      |                                            |
      |
      |
      |

    */
    const stone = { width: 100, height: 20 };
    const availableSpots = [
      {
        top: 0,
        left: 60,
        right: 100,
        bottom: null,
      },
      {
        top: 20,
        left: 30,
        right: 100,
        bottom: null,
      },
      {
        top: 30,
        left: 0,
        right: 100,
        bottom: null,
      },
    ];

    const expected = {
      position: { top: 30, left: 0 },
      availableSpots: [
        {
          top: 0,
          left: 60,
          right: 100,
          bottom: 30,
        },
        {
          top: 20,
          left: 30,
          right: 100,
          bottom: 30,
        },
        {
          top: 50,
          left: 0,
          right: 100,
          bottom: null,
        },
      ],
    };

    const containerSize = 100;
    const result = placeStone({
      stone,
      availableSpots,
      containerSize,
    });
    expect(result.position).toEqual(expected.position);
    expect(result.availableSpots).toEqual(expected.availableSpots);
  });
});

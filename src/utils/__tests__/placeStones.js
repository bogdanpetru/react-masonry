import placeStones from '../placeStones';

describe('paceStones', () => {
  it(`
      a spot should be cut when a second stone is placed above it
    `, () => {
    const stones = [
      {
        width: 200,
        height: 368,
      },
      {
        width: 190,
        height: 135,
      },
      {
        width: 140,
        height: 161,
      },
      {
        width: 100,
        height: 117,
      },
      {
        width: 300,
        height: 214,
      },
      {
        width: 160,
        height: 114,
      },
      {
        width: 130,
        height: 63,
      },
    ];
    const expected = [
      {
        left: 0,
        top: 0,
      },
      {
        left: 200,
        top: 0,
      },
      {
        left: 200,
        top: 135,
      },
      {
        left: 390,
        top: 0,
      },
      {
        left: 200,
        top: 296,
      },
      {
        left: 340,
        top: 135,
      },
      {
        left: 0,
        top: 368,
      },
    ];

    expect(
      placeStones({
        stones,
        containerSize: 500,
      }.positions),
    ).toEqual(expected);
  });
});

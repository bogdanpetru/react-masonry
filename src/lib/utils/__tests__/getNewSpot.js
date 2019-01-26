import { getNewSpot } from "../getNewSpot";

describe("getNewSpot", () => {
  it("should return a correct spot taking into account next spots", () => {
    // if there is a spot in the right direction
    // that has a top bigger than this it will intersect this spot
    // and it should have it's right no more thant this spot left
    const availableSpots = [
      { top: 30, left: 0, right: 30 },
      { top: 50, left: 30, right: 60 },
      { top: 30, left: 60, right: 100 }
    ];

    // it will fit in first and a new
    // spot will be added on top
    const position = {
      top: 30,
      left: 0
    };
    const stone = {
      width: 30,
      height: 10
    };
    const newSpot = {
      top: 40,
      left: 0,
      right: 30,
      bottom: null
    };

    expect(
      getNewSpot({
        availableSpots,
        stone,
        position,
        optimalSpot: availableSpots[0]
      })
    ).toEqual(newSpot);
  });
});

import placeStone from '../placeStone'

describe('placeStone', () => {
  it('should place first stone correct', () => {
    const stone = { width: 50, height: 50 }
    const availableSpots = [{ top: 0, left: 0, right: 100, bottom: null}]
    const expected = {
      position: { top: 0, left: 0 },
      availableSpots: [
        { top: 0, left: 50, right: 100, bottom: null },
        { top: 50, left: 0, right: 100, bottom: null }
      ]
    }
    const containerSize = 100
    expect(
      placeStone({
        stone, availableSpots, containerSize
      })
    ).toEqual(expected)
  })
  it('should place the 2nd stone correct', () => {
    const stone = { width: 30, height: 30 }
    const availableSpots = [
      { top: 0, left: 50, right: 100, bottom: null },
      { top: 50, left: 0, right: 100, bottom: null }
    ]
    const expected = {
      position: { top: 0, left: 50 },
      availableSpots: [
        { top: 0, left: 80, right: 100, bottom: null },
        { top: 50, left: 0, right: 100, bottom: null },
        { top: 30, left: 50, right: 100, bottom: null },
      ]
    }
    const containerSize = 100
    expect(
      placeStone({
        stone, availableSpots, containerSize
      })
    ).toEqual(expected)

  })
})

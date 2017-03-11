import placeStone from '../placeStone'

describe('placeStone', () => {
  it('should place first stone correct', () => {
    const stone = { width: 50, height: 50 }
    const availableSpots = [{ top: 0, left: 0, right: 100, bottom: null}]
    const expected = {
      position: { top: 0, left: 0 },
      availableSpots: [
        { top: 0, left: 50, right: 100, bottom: null },
        { top: 100, left: 0, right: 100, bottom: null }
      ]
    }
    expect(
      placeStone({
        stone, availableSpots
      })
    ).toEqual(expected)
  })
})

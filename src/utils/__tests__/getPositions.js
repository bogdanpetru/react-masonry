import getPositions from '../getPositions'

describe('getPositions', () => {
  test('should return correct positions on two rows', () => {
    const boxes = [
      { width: 3, height: 3 }, // 1
      { width: 4, height: 2 }, // 2
      { width: 4, height: 4 }, // 3
      { width: 5, height: 2 }, // 4
      { width: 4, height: 3 }, // 5
        { width: 5, height: 1 }, // 6
      { width: 3, height: 3 }, // 7
      { width: 4, height: 2 }, // 8
      { width: 3, height: 2 }, // 9
    ]
    const expected = [
      { left: 0, top: 0 }, // 1
      { left: 3, top: 0 }, // 2
      { left: 7, top: 0 }, // 3
      { left: 10, top: 0 }, // 4
      { left: 3, top: 2 }, // 5
      { left: 10, top: 2 }, // 6
      { left: 0, top: 3 }, // 7
      { left: 10, top: 3 }, // 8
      { left: 7, top: 5 }, // 9
    ]
    const width = 15
    expect(getPositions({ boxes, width }))
      .toEqual(expected)
  })
})

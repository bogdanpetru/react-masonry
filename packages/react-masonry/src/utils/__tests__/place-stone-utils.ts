import { describe, expect, it } from '@jest/globals'
import { Spot } from '../../internal-types'
import { sortByTopFirstLeftSecond } from '../place-stone-utils'

describe('sortByTopFirstLeftSecond', () => {
  it('should sort first by top and then by left, when top is the same', () => {
    const list: Spot[] = [
      { top: 10, left: 10, right: 100 },
      { top: 10, left: 5, right: 100 },
      { top: 10, left: 0, right: 100 },
    ]
    expect(sortByTopFirstLeftSecond(list)).toEqual([
      { top: 10, left: 0, right: 100 },
      { top: 10, left: 5, right: 100 },
      { top: 10, left: 10, right: 100 },
    ])
  })
  it('should sort first by top and then by left, when top is the same', () => {
    const list: Spot[] = [
      { top: 250, left: 0, right: 100 },
      { top: 150, left: 65, right: 100 },
      { top: 200, left: 65, right: 100 },
      { top: 100, left: 50, right: 100 },
      { top: 0, left: 40, right: 100 },
      { top: 50, left: 40, right: 100 },
    ]
    expect(sortByTopFirstLeftSecond(list)).toEqual([
      { top: 0, left: 40, right: 100 },
      { top: 50, left: 40, right: 100 },
      { top: 100, left: 50, right: 100 },
      { top: 150, left: 65, right: 100 },
      { top: 200, left: 65, right: 100 },
      { top: 250, left: 0, right: 100 },
    ])
  })
})

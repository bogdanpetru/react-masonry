import type { CSSProperties } from 'react'
import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const boxes: CSSProperties[] = [
    {
      width: `20%`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `30%`,
      height: 160,
      background: randomColor(),
    },
    {
      width: `50%`,
      height: 120,
      background: randomColor(),
    },
    {
      width: `20%`,
      height: 60,
      background: randomColor(),
    },
    {
      width: `35%`,
      height: 130,
      background: randomColor(),
    },
    {
      width: `15%`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `25%`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `25%`,
      height: 120,
      background: randomColor(),
    },
  ]

  return (
    <Masonry>
      {boxes.map((box, index) => (
        <div style={box}>{index}</div>
      ))}
    </Masonry>
  )
}

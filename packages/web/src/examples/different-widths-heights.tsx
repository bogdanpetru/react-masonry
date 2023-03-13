import type { CSSProperties } from 'react'
import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const gutter = 10

  const boxes: CSSProperties[] = [
    {
      width: `calc(20% - ${gutter}px)`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `calc(30% - ${gutter}px)`,
      height: 160,
      background: randomColor(),
    },
    {
      width: `calc(50% - ${gutter}px)`,
      height: 120,
      background: randomColor(),
    },

    {
      width: `calc(20% - ${gutter}px)`,
      height: 60 - gutter,
      background: randomColor(),
    },
    {
      width: `calc(35% - ${gutter}px)`,
      height: 130,
      background: randomColor(),
    },
    {
      width: `calc(15% - ${gutter}px)`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `calc(25% - ${gutter}px)`,
      height: 100,
      background: randomColor(),
    },
    {
      width: `calc(25% - 30px)`,
      height: 120,
      background: randomColor(),
    },
  ]

  return (
    <Masonry gutter={gutter}>
      {boxes.map((box, index) => (
        <div style={box}>{index}</div>
      ))}
    </Masonry>
  )
}

import type { CSSProperties } from 'react'
import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const height = 160
  const gutter = 10

  const boxes: CSSProperties[] = [
    { width: `calc(20% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(30% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(50% - ${gutter}px)`, background: randomColor(), height },
    // second row
    { width: `calc(30% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(40% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(30% - ${gutter}px)`, background: randomColor(), height },
    // third row
    { width: `calc(30% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(30% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(40% - ${gutter}px)`, background: randomColor(), height },
    // forth
    { width: `calc(25% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(25% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(25% - ${gutter}px)`, background: randomColor(), height },
    { width: `calc(25% - ${gutter}px)`, background: randomColor(), height },
  ]

  return (
    <Masonry gutter={gutter}>
      {boxes.map((box, index) => (
        <div style={box}>{index}</div>
      ))}
    </Masonry>
  )
}

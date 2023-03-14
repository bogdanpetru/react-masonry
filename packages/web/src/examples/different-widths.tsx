import type { CSSProperties } from 'react'
import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const height = 160

  const boxes: CSSProperties[] = [
    { width: '20%', background: randomColor(), height },
    { width: '30%', background: randomColor(), height },
    { width: '50%', background: randomColor(), height },
    // second row
    { width: '30%', background: randomColor(), height },
    { width: '40%', background: randomColor(), height },
    { width: '30%', background: randomColor(), height },
    // third row
    { width: '30%', background: randomColor(), height },
    { width: '30%', background: randomColor(), height },
    { width: '40%', background: randomColor(), height },
    // forth
    { width: '25%', background: randomColor(), height },
    { width: '25%', background: randomColor(), height },
    { width: '25%', background: randomColor(), height },
    { width: '25%', background: randomColor(), height },
  ]

  return (
    <Masonry>
      {boxes.map((box, index) => (
        <div style={box}>{index}</div>
      ))}
    </Masonry>
  )
}

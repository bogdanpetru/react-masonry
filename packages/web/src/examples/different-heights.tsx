import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const numberOfBoxes = 16
  const gutter = 10
  return (
    <Masonry gutter={gutter}>
      {Array.from({ length: numberOfBoxes }).map((_, index) => (
        <div
          key={index}
          style={{
            width: `calc(100% / 4 - ${gutter}px)`,
            height: pick([100, 130, 180, 200, 260, 80]),
            backgroundColor: randomColor(),
          }}
        >
          {index}
        </div>
      ))}
    </Masonry>
  )
}

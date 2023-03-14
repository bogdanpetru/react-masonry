import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export default function DifferentHeights() {
  const numberOfBoxes = 16

  return (
    <Masonry>
      {Array.from({ length: numberOfBoxes }).map((_, index) => (
        <div
          key={index}
          style={{
            width: '25%',
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

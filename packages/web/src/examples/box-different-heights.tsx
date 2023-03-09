import { Masonry } from 'react-masonry'
import { pick, randomColor } from './random'

export function HomeExample() {
  const numberOfBoxes = 20
  return (
    <Masonry gutter={20}>
      {Array.from({ length: numberOfBoxes }).map((_, index) => (
        <div
          key={index}
          style={{
            width: 'calc(100% / 4 - 20px)',
            height: pick([120, 160, 240, 340, 420]),
            backgroundColor: randomColor(),
          }}
        >
          {index}
        </div>
      ))}
    </Masonry>
  )
}

// @ts-ignore
import { Masonry } from 'react-masonry'
// @ts-ignore
import { useImages } from './useImages'

export default function App() {
  const numberOfBoxes = 30
  const gutter = 30
  const { images, boxes } = useImages({ numberOfBoxes, gutter })

  return (
    <Masonry gutter={10}>
      {/* @ts-ignore */}
      {boxes.slice(0, numberOfBoxes).map((box, index) => {
        const img = images[index]
        if (!img) {
          return <div key={index}>loading</div>
        }
        return (
          <div
            key={index}
            style={{
              ...box,
              height: img.height,
              backgroundImage: `url(${img.url})`,
            }}
          ></div>
        )
      })}
    </Masonry>
  )
}

import { Masonry } from 'react-masonry'
import { useImages } from './useImages'

export default function App() {
  const numberOfBoxes = 30
  const gutter = 30
  const { images, boxes } = useImages({ numberOfBoxes, gutter })

  return (
    <Masonry gutter={10}>
      {boxes.slice(0, numberOfBoxes).map((box, index) => {
        const img = images[index]
        if (!img) {
          return <div>loading</div>
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

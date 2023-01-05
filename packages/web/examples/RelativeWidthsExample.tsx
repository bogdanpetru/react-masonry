import React from 'react'
import { Masonry } from 'react-masonry'
import { useImages } from './useImages'

const titleStyle: React.CSSProperties = {
  position: 'absolute',
  left: 5,
  top: 5,
  fontWeight: '700',
  backgroundColor: 'rgb(28 25 25 / 33%)',
  color: '#fff',
  padding: 5,
}

export const RelativeWidthsExample = ({ gutter = 10, numberOfBoxes = 1 }) => {
  const { images, boxes } = useImages({ numberOfBoxes, gutter })
  if (!images?.length) {
    return <div>Loading Images</div>
  }
  return (
    <Masonry gutter={gutter} style={{ height: 500 }} transition="fadeMove">
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
          >
            <div style={titleStyle}>{index}</div>
          </div>
        )
      })}
    </Masonry>
  )
}

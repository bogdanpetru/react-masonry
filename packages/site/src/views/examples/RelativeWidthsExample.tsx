import React, { useEffect, useMemo, useState } from 'react'
import { Masonry } from 'react-masonry'

const IMG_LOCAL_STORAGE_KEY = 'react-masonry/examples-relative-widths'

const common = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  width: '33%',
}

const titleStyle: React.CSSProperties = {
  position: 'absolute',
  left: 5,
  top: 5,
  fontWeight: '700',
  backgroundColor: 'rgb(28 25 25 / 33%)',
  color: '#fff',
  padding: 5,
}

function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

function random250() {
  return random(0, 255)
}

function getBox(gutter: number) {
  return {
    ...common,
    width: `calc(25% - ${gutter}px)`,
    backgroundColor: randomColor(),
  }
}

function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`
}

function getImageSrc(height: number, width = 230) {
  return (
    [`https://loremflickr.com/${width}/`, `https://picsum.photos/${width}/`][
      random(0, 1)
    ] + height
  )
}

const getNewImages = (numberOfImages: number) => {
  return [...Array(numberOfImages)].map(async () => {
    const height = [220, 250, 280, 300, 330][random(0, 4)]
    const width = 400
    const img = getImageSrc(height, width)
    const resp = await fetch(img)
    return {
      url: resp.url,
      height,
      width,
    }
  })
}

const getImages = async (numberOfImages: number) => {
  let leftOverImages = numberOfImages
  const storedImages = localStorage.getItem(IMG_LOCAL_STORAGE_KEY)
  let storedParsedImages = []

  if (storedImages) {
    try {
      storedParsedImages = JSON.parse(storedImages)
    } catch (e) {
      console.log('Failed to load images', e)
    }

    if (numberOfImages <= storedParsedImages?.length) {
      return storedParsedImages
    } else {
      leftOverImages = numberOfImages - storedParsedImages?.length
    }
  }

  const newImages = await Promise.all(getNewImages(leftOverImages))

  const images = storedParsedImages
    ? [...storedParsedImages, ...newImages]
    : newImages

  localStorage.setItem(IMG_LOCAL_STORAGE_KEY, JSON.stringify(images))

  return images
}

export const RelativeWidthsExample = ({ gutter = 10, numberOfBoxes = 1 }) => {
  const [images, setImages] = useState<{ url: string; height: number }[]>([])
  const boxes = useMemo(() => {
    return [...Array(numberOfBoxes)].map(() => getBox(gutter))
  }, [numberOfBoxes, gutter])

  useEffect(() => {
    ;(async () => {
      const images = await getImages(numberOfBoxes)
      setImages(images)
    })()
  }, [numberOfBoxes])

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

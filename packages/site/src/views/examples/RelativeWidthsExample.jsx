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

const titleStyle = {
  position: 'absolute',
  left: 5,
  top: 5,
  fontWeight: '700',
  backgroundColor: '#333',
  color: '#fff',
  padding: 5,
}

function random(min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

function random250() {
  return random(0, 255)
}

function getBox() {
  return {
    ...common,
    backgroundColor: randomColor(),
  }
}

function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`
}

function getImageSrc(height, width = 230) {
  return (
    [`https://loremflickr.com/${width}/`, `https://picsum.photos/${width}/`][
      random(0, 1)
    ] + height
  )
}

const getImages = async (numberOfImages) => {
  const storedImages = localStorage.getItem(IMG_LOCAL_STORAGE_KEY)
  if (storedImages) {
    try {
      const images = JSON.parse(storedImages)
      return images
    } catch (e) {
      console.log('Failed to load images', e)
    }
  }

  const promises = [...Array(numberOfImages)].map(async () => {
    const height = Math.floor(random(300, 800) / 100) * 100
    const width = 300
    const img = getImageSrc(height, width)
    const resp = await fetch(img)
    return {
      url: resp.url,
      height,
      width,
    }
  })

  const images = await Promise.all(promises)
  if (!storedImages) {
    localStorage.setItem(IMG_LOCAL_STORAGE_KEY, JSON.stringify(images))
  }

  return images
}

const App = ({ stacking, gutter = 0, numberOfBoxes = 1 }) => {
  const [images, setImages] = useState()

  const boxes = useMemo(() => {
    return [...Array(numberOfBoxes)].map(getBox)
  }, [numberOfBoxes])

  useEffect(() => {
    ;(async () => {
      const images = await getImages(numberOfBoxes)
      setImages(images)
    })()
  }, [numberOfBoxes])

  if (!images) {
    return <div>Loading Images</div>
  }

  return (
    <Masonry
      gutter={gutter}
      style={{ height: 500 }}
      stacking={stacking}
      transition="fadeMove"
    >
      {boxes.slice(0, numberOfBoxes).map((box, index) => {
        const img = images[index]
        console.log(img.url)
        return (
          <div
            className="box"
            key={index}
            style={{
              ...box,
              height: img.height,
              backgroundImage: `url(${img.url})`,
            }}
          >
            <div key={index} style={titleStyle}>
              {index}
            </div>
          </div>
        )
      })}
    </Masonry>
  )
}

export default App

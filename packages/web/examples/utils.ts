const IMG_LOCAL_STORAGE_KEY = 'react-masonry/examples-relative-widths'

export function getImageSrc(height: number, width = 230) {
  return `https://picsum.photos/${width}/` + height
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

export async function getImages(numberOfImages: number) {
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

export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function random250() {
  return random(0, 255)
}

export function randomColor() {
  return `rgb(${random250()},${random(0, 100)},${random(0, 120)})`
}

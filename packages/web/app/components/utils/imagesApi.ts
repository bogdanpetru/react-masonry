import { random } from './random'

const IMG_LOCAL_STORAGE_KEY = 'react-masonry/examples-relative-widths'

export function getImageSrc(height: number, width = 230) {
  return `https://picsum.photos/${width}/` + height
}

export const getNewImages = (
  numberOfImages: number,
  heights = [220, 250, 280, 300, 330],
) => {
  return [...Array(numberOfImages)].map(async () => {
    const height = heights[random(0, 4)]
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

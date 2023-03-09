import { useEffect, useMemo, useState } from 'react'
import { getImages } from './imagesApi'
import { randomColor } from './random'

export function getBox(gutter: number) {
  const common = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    width: `calc(100% / 4 - ${gutter}px)`,
  }

  return {
    ...common,
    backgroundColor: randomColor(),
  }
}

export function useImages({
  numberOfBoxes,
  gutter,
}: {
  numberOfBoxes: number
  gutter: number
}): {
  images: { url: string; height: number }[]
  boxes: ReturnType<typeof getBox>[]
} {
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

  return { images, boxes }
}

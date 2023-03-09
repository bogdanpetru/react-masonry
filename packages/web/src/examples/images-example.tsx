import { Masonry } from 'react-masonry'
import { useImages } from './useImages'
import { CSSProperties, forwardRef, useEffect, useMemo, useState } from 'react'
import { pick, randomColor } from './random'
import { getImageSrc } from './imagesApi'

const KEY = 'react-masonry/examples-images'

const ImageComponent = forwardRef<
  HTMLDivElement,
  { gutter: number; style: CSSProperties }
>((props, ref) => {
  const { gutter } = props
  const height = useMemo(() => {
    return pick([220, 250, 280, 300, 330])
  }, [])
  const imageWidth = 400

  const [url, setUrl] = useState('')
  useEffect(() => {
    ;(async () => {
      const imageUrl = getImageSrc(height, imageWidth)
      const resp = await fetch(imageUrl)
      setUrl(resp.url)
    })()
  }, [])

  const style: CSSProperties = {
    ...props.style,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    width: `calc(100% / 4 - ${gutter}px)`,
    backgroundColor: randomColor(),
  }

  if (url) {
    style.backgroundImage = `url(${url})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }

  return (
    <div style={style} ref={ref}>
      {!url && 'loading'}
    </div>
  )
})

export default function ImagesExample() {
  const numberOfBoxes = 30
  const gutter = 30

  return (
    <Masonry gutter={10}>
      {Array.from({ length: numberOfBoxes }, (_, index) => {
        return <ImageComponent key={index} gutter={gutter} />
      })}
    </Masonry>
  )
}

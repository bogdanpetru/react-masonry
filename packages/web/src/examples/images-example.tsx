import { Masonry } from 'react-masonry'
import { CSSProperties, forwardRef, useEffect, useMemo, useState } from 'react'
import { pick, randomColor } from './random'

export function getImageSrc(height: number, width = 230) {
  return `https://picsum.photos/${width}/` + height
}

const ImageComponent = forwardRef<
  HTMLDivElement,
  { gutter: number; style?: CSSProperties; id: number }
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

  let width = `calc(100% / 5 - ${gutter}px)`
  const matchTablet = globalThis.matchMedia('(max-width: 768px)').matches
  if (matchTablet) {
    width = `calc(100% / 3 - ${gutter}px)`
  }

  const style: CSSProperties = {
    ...props.style,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    width,
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
  const gutter = 10

  return (
    <Masonry gutter={gutter}>
      {Array.from({ length: numberOfBoxes }, (_, index) => {
        return <ImageComponent key={index} id={index} gutter={gutter} />
      })}
    </Masonry>
  )
}

import { Masonry } from 'react-masonry'
import { CSSProperties, forwardRef, useEffect, useMemo, useState } from 'react'
import { pick } from './random'

export function getImageSrc(height: number, width = 230) {
  return `https://picsum.photos/${width}/` + height
}

const ImageComponent = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; id: number }
>((props, ref) => {
  const height = useMemo(() => {
    return pick([220, 250, 280, 300, 330])
  }, [])
  const imageWidth = 240

  const [url, setUrl] = useState('')
  useEffect(() => {
    ;(async () => {
      const imageUrl = getImageSrc(height, imageWidth)
      const resp = await fetch(imageUrl)
      setUrl(resp.url)
    })()
  }, [])

  let width = `calc(100% / 5)`
  const matchTablet = globalThis.matchMedia('(max-width: 768px)').matches
  if (matchTablet) {
    width = `calc(100% / 3)`
  }

  const style: CSSProperties = {
    ...props.style,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    width,
    padding: 10,
  }

  return (
    <div style={style} ref={ref}>
      {url ? (
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      ) : (
        'loading'
      )}
    </div>
  )
})

export default function ImagesExample() {
  const numberOfBoxes = 30

  return (
    <Masonry>
      {Array.from({ length: numberOfBoxes }, (_, index) => {
        return <ImageComponent key={index} id={index} />
      })}
    </Masonry>
  )
}

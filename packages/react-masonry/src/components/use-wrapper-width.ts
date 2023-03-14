import { MutableRefObject, useEffect, useState } from 'react'

export const useWrapperWidth = (
  wrapperRef: MutableRefObject<HTMLElement | null>,
) => {
  const [width, setWidth] = useState<number | null>(null)
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }
    return () => {
      observer.disconnect()
    }
  }, [wrapperRef])

  return width
}

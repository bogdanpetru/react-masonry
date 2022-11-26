import { useEffect, useRef, useState } from 'react'
import { debounce } from '../utils/debounce'

export const useWindowWidth = () => {
  const [width, setWidth] = useState<number>()
  const debounceRef = useRef(debounce(setWidth, 300))

  useEffect(() => {
    const onResize = () => {
      // todo add throttle
      debounceRef.current(window.innerWidth)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return width
}

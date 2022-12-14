import * as React from 'react'
import {
  FunctionComponent,
  cloneElement,
  useRef,
  CSSProperties,
  Children,
} from 'react'

import { usePositions } from './use-positions'
import { getStoneStyle } from './style'
import { useWindowWidth } from './use-window-width'
import { MasonryProps } from '../types'

export const Masonry: FunctionComponent<
  MasonryProps & React.PropsWithChildren
> = ({
  children,
  gutter,
  style,
  transition = false,
  transitionDuration = 500,
  transitionStep = 50,
  ...rest
}) => {
  const boxesRefs = useRef<HTMLElement[]>([])
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const windowWidth = useWindowWidth()

  const { positions, containerHeight } = usePositions({
    boxesRefs,
    wrapperRef,
    gutter,
    children,
    windowWidth,
  })

  const preparedStyle: CSSProperties = {
    minHeight: containerHeight ?? 0,
    position: 'relative',
    ...style,
  }

  return (
    <div ref={wrapperRef} style={preparedStyle} {...rest}>
      {Children.map(children, (child, index) => {
        if (typeof child !== 'object' || !child || !('type' in child)) {
          return child
        }
        const style = getStoneStyle({
          style: child.props.style,
          position: positions[index],
          transition,
          transitionDuration,
        })
        const stoneProps = {
          style,
          ref: (ref: HTMLElement) => (boxesRefs.current[index] = ref),
        }

        return cloneElement(child, {
          ...child.props,
          ...stoneProps,
        })
      })}
    </div>
  )
}

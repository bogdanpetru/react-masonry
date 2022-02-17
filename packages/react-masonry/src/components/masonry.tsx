import React, { cloneElement, useRef } from 'react'

import { usePositions } from './use-positions'
import { getStoneStyle } from './style'
import { useWindowWidth } from './use-window-width'
import { MasonryProps } from '../types'

export const Masonry: React.FunctionComponent<MasonryProps> = ({
  children,
  gutter,
  style,
  transition = false,
  transitionDuration = 500,
  transitionStep = 50,
  stacking,
  ...rest
}) => {
  const boxesRefs = useRef([])
  const wrapperRef = useRef()
  const windowWidth = useWindowWidth()

  const { positions, containerHeight } = usePositions({
    boxesRefs,
    wrapperRef,
    gutter,
    children,
    windowWidth,
  })

  const preparedStyle: React.CSSProperties = {
    minHeight: containerHeight,
    position: 'relative',
    ...style,
  }

  return (
    <div ref={wrapperRef} style={preparedStyle} {...rest}>
      {React.Children.map(children, (child, index) => {
        if (
          typeof child !== 'object' || !('type' in child)
        ) {
          return child;
        }

        const stoneProps = {
          style: getStoneStyle({
            style: child.props.style,
            position: positions[index],
            transition,
            transitionDuration,
          }),
          ref: (ref: Element) => (boxesRefs.current[index] = ref)
        }

        return cloneElement(child, {
          ...child.props,
          ...stoneProps,
        })
      })}
    </div>
  )
}


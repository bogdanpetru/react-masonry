import React, { useState, useEffect } from 'react'
import { Stone, Position } from '../internal-types'
import { Gutter } from '../types'
import { placeStones } from '../utils/place-stones'

const getStones = (stoneNodes: HTMLElement[]): Stone[] => {
  return stoneNodes.reduce((acc, stone) => {
    if (!stone) {
      return acc
    }
    const rect = stone.getBoundingClientRect()
    acc.push({
      width: rect.width,
      height: rect.height,
    })
    return acc
  }, [] as Stone[])
}

const usePositions = ({
  boxesRefs,
  wrapperRef,
  gutter,
  children,
  windowWidth,
}: {
  boxesRefs: React.MutableRefObject<HTMLElement[]>
  wrapperRef: React.MutableRefObject<HTMLElement | null>
  gutter?: Gutter
  children: React.ReactNode
  windowWidth: number | undefined
}) => {
  const [{ positions, containerHeight, stones }, setPositionsSpec] = useState<{
    positions: Position[]
    containerHeight: number | null
    stones: Stone[]
  }>({
    positions: [],
    containerHeight: null,
    stones: [],
  })

  useEffect(() => {
    const stones = getStones(boxesRefs.current)
    const containerSize = wrapperRef.current?.offsetWidth ?? 0
    if (containerSize === null) {
      return
    }
    const spec = placeStones({
      stones,
      gutter: gutter ?? {},
      containerSize,
    })

    setPositionsSpec({ ...spec, stones }) // TODO refactor spec
  }, [children, gutter, boxesRefs, wrapperRef, windowWidth])

  return { positions, containerHeight, stones }
}

export { usePositions }

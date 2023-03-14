import React, { useState, useEffect } from 'react'
import { Stone, Position, Spot } from '../internal-types'

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
  children,
  windowWidth,
  wrapperWidth,
}: {
  boxesRefs: React.MutableRefObject<HTMLElement[]>
  wrapperRef: React.MutableRefObject<HTMLElement | null>
  children: React.ReactNode
  windowWidth: number | undefined
  wrapperWidth: number | null
}) => {
  const [
    { positions, containerHeight, stones, availableSpots },
    setPositionsSpec,
  ] = useState<{
    positions: Position[]
    containerHeight: number | null
    stones: Stone[]
    availableSpots: Spot[]
  }>({
    positions: [],
    containerHeight: null,
    stones: [],
    availableSpots: [],
  })

  useEffect(() => {
    const stones = getStones(boxesRefs.current)
    const containerSize = wrapperRef.current?.offsetWidth ?? 0
    if (containerSize === null) {
      return
    }
    const spec = placeStones({
      stones,
      containerSize,
    })

    setPositionsSpec({ ...spec, stones }) // TODO refactor spec
  }, [children, boxesRefs, wrapperRef, windowWidth, wrapperWidth])

  return { positions, containerHeight, stones, availableSpots }
}

export { usePositions }

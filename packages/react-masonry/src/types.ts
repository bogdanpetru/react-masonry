import * as React from 'react'

export type GutterFullSpecified = {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type GutterNumber = number

export type Gutter = GutterNumber | GutterFullSpecified

export interface MasonryProps {
  /**
   * Defines the spacing between stones.
   * @defaults 0
   */
  gutter?: Gutter

  /**
   * If different than false, each item will appear one after another with an interval of `transitionStep` in between.
   * @defaults false
   */
  transition?: 'fade' | 'fadeMove' | false

  /**
   * Time (in ms) in between each stone placement, this is relevant if `transition` prop is not `false`.
   * @defaults 50
   */
  transitionStep?: number

  /**
   * When transition is set, stones can appear one after the other.
   * @defaults false
   */
  enterOneAfterAnother?: boolean

  /**
   * Speed with which stones are placed when `enterOneAfterAnother=true`
   * @defaults 300
   */
  transitionDuration?: number

  /**
   * Replaces the stones when windows changes size.
   * @defaults true
   */
  updateOnWindowResize?: boolean

  /**
   *  Related to `updateOnWindowResize`.
   *  Window resize listener is debouced, this sets the wait time.
   * @defaults 300
   */
  updateOnWindowResizeDebounceWait?: number

  /**
   * Style applied on the top element
   * @defaults none
   */
  style?: React.CSSProperties
}

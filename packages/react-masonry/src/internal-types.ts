export type Position = {
  top: number
  left: number
}
export interface Stone {
  width: number
  height: number
}

export interface Spot {
  top: number
  left: number
  right: number
  bottom?: number
}

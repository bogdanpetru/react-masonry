// @flow

export type Stone = {
  width: number,
  height: number,
};

export type Position = {
  top: number,
  left: number,
};

export type Spot = {
  top: number,
  left: number,
  right: number,
  bottom: number | null,
};

export type Gutter = {
  top?: number,
  left?: number,
  right?: number,
  bottom?: number,
};

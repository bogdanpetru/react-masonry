// @flow

export type State = {
  positions: Position[],
  availableSpots: Spot[],
  containerHeight: number
};

export type Props = {
  children: any,
  style: any,
  gutter: Gutter | number,
  transition: "fade" | "move" | "fadeMove" | false,
  transitionDuration: number,
  transitionStep: number,
};

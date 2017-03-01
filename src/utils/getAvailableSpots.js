// @flow
import type { position } from './types';
import { compose, map, sort } from 'ramda';

const sortByHeight = (current: position, next: position) =>
  current.bottom < next.bottom ? -1 : 1;

const mapItemToPosition = item => ({
  top: item.bottom,
  left: item.left,
  right: item.right,
  bottom: null, // later
});

const getAvailableSpots = (
  {
    previousRow,
    // currentRow,
  }: { previousRow: position[], currentRow: position[] },
): position[] => compose(map(mapItemToPosition), sort(sortByHeight))(previousRow);

export default getAvailableSpots;

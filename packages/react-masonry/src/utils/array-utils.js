export function find(func, list) {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const test = func(item);
    if (test) {
      return item;
    }
  }

  return null;
}

export const filter = (func, list) => list.filter(func);

export const sort = (func, list) => [ ...list ].sort(func);

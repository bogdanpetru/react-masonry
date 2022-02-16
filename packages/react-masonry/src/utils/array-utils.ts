export function find(func: (item: any) => boolean, list: any[]) {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const test = func(item);
    if (test) {
      return item;
    }
  }

  return null;
}

export const filter = (func: (item: any, index: number, collection: any[]) => boolean, list: any[]) => list.filter(func);

export const sort = (func: (a: any, b: any) => number, list: any[]) => [...list].sort(func);

export function find(func: (item: any) => boolean, list: any[]): any {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const test = func(item);
    if (test) {
      return item;
    }
  }

  return null;
}

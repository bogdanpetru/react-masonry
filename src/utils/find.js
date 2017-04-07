// @flow

function find(func: () => boolean, list: any[]): any {
  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i];
    const test = func(item);
    if (test) {
      return item;
    }
  }

  return null;
}

export default find;
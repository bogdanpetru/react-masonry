// @flow
function filter(func: (item: any) => boolean, list: any[]): any[] {
  return list.filter(func);
}

export default filter;

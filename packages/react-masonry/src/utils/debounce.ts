export function debounce(
  func: Function,
  wait: number,
  immediate?: boolean,
): Function {
  let timeout: ReturnType<typeof setTimeout> | null
  return function (...args: any[]) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      if (!immediate) func.apply(null, args)
    }, wait)
    if (immediate && !timeout) func.apply(null, args)
  }
}

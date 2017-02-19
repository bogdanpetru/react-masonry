function add(...args) {
  return args.reduce((acc, num) => acc + num, 0)
}

export default add
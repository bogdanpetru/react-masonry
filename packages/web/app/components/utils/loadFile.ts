export const loadFile = (path: string) => {
  const fs = require('fs')
  const root = process.cwd()
  return fs.readFileSync(root + path, 'utf-8')
}

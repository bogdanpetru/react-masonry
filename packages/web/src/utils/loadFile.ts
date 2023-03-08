import fs from 'fs'

export const loadFile = (path: string) => {
  const root = process.cwd()

  return fs.readFileSync(root + path, 'utf-8')
}

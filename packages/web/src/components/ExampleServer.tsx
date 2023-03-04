import { FunctionComponent } from 'react'
import { Example } from './Example'

export type ExampleServerProps = {
  masonry?: boolean
  app?: boolean
  imagesApi?: boolean
  useImages?: boolean
}

export const ExampleServer: FunctionComponent<ExampleServerProps> = (props) => {
  const {
    masonry = true,
    app = true,
    imagesApi = false,
    useImages = false,
  } = props

  const props = {
    masonry: loadFile('/../react-masonry/dist/index.js'),
    app: loadFile('/app/examples/example.tsx'),
  }

  return <Example />
}

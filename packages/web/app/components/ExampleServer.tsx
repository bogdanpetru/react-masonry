import { FunctionComponent } from 'react'
import { Example } from './Example'
import { loadFile } from './utils/loadFile'

export type ExampleServerProps = {
  masonry?: boolean
  app: string
  imagesApi?: boolean
  useImages?: boolean
}

export const ExampleServer: FunctionComponent<ExampleServerProps> = (props) => {
  const { app, masonry = true, imagesApi = false, useImages = false } = props

  const files = {
    masonry: loadFile('/../react-masonry/dist/index.js'),
    app: loadFile(app),
    imagesApi: loadFile('/app/components/utils/imagesApi.ts'),
    useImages: loadFile('/app/components/utils/useImages.ts'),
    random: loadFile('/app/components/utils/random.ts'),
  }

  return (
    <Example
      masonry={masonry ? files.masonry : undefined}
      app={app ? files.app : undefined}
      imagesApi={imagesApi ? files.imagesApi : undefined}
      useImages={useImages ? files.useImages : undefined}
      random={useImages ? files.random : undefined}
    />
  )
}

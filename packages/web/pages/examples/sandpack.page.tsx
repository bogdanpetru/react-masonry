import { loadFile } from '../../utils/loadFile'
import { Example } from '../../src/components/Example'

export const getStaticProps = () => {
  return {
    props: {
      masonry: loadFile('/../react-masonry/dist/index.js'),
      app: loadFile('/pages/examples/sandpack.app.tsx'),
    },
  }
}

export interface AppProps {
  masonry: string
  app: string
}

export default function App(props: AppProps) {
  return <Example masonry={props.masonry} app={props.app} />
}

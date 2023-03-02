import { Example } from '@/components/Example'
import { loadFile } from '../../utils/loadFile'

const Examples = () => {
  const props = {
    masonry: loadFile('/../react-masonry/dist/index.js'),
    app: loadFile('/pages/examples/sandpack.app.tsx'),
  }

  return <Example masonry={props.masonry} app={props.app} />
}

export default Examples

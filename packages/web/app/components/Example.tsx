'use client'

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from '@codesandbox/sandpack-react'

import { FunctionComponent, useState } from 'react'
import { VITE_REACT_TEMPLATE } from './react-typescript-template'

export interface ExampleProps {
  masonry: string
  app: string
  imagesApi?: string
  useImages?: string
  random?: string
}

export const Example: FunctionComponent<ExampleProps> = (props) => {
  const [showCode, setShowCode] = useState(false)
  const files: Record<string, any> = {
    ...VITE_REACT_TEMPLATE.files,
    'App.tsx': props.app,
    './node_modules/react-masonry/package.json': {
      hidden: true,
      code: JSON.stringify({
        name: 'react-masonry',
        main: './dist/index.js',
      }),
    },
    './node_modules/react-masonry/dist/index.js': {
      hidden: true,
      code: props.masonry,
    },
  }

  if (props.imagesApi) {
    files['imagesApi.ts'] = {
      hidden: true,
      code: props.imagesApi,
    }
  }
  if (props.useImages && props.random) {
    files['useImages.ts'] = {
      hidden: true,
      code: props.useImages,
    }
    files['random.ts'] = {
      hidden: true,
      code: props.random,
    }
  }

  return (
    <SandpackProvider
      files={files}
      customSetup={{
        environment: 'node',
        dependencies: {
          'react-masonry': '*',
        },
      }}
    >
      <button onClick={() => setShowCode(!showCode)}>toggle</button>
      <SandpackLayout>
        <SandpackPreview style={{ height: 800 }} />
      </SandpackLayout>
      {showCode && <SandpackCodeEditor style={{ height: 300 }} />}
    </SandpackProvider>
    // <Sandpack
    //   options={{
    //     editorHeight: 800,
    //     editorWidthPercentage: 50,
    //   }}
    //   files={files}
    //   customSetup={{
    //     environment: 'node',
    //     dependencies: {
    //       'react-masonry': '*',
    //     },
    //   }}
    // />
  )
}

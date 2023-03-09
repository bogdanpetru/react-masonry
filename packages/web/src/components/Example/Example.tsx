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
  otherFiles?: { name: string; code: string }[]
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

  for (const file of props.otherFiles || []) {
    files[file.name] = {
      code: file.code,
      hidden: true,
    }
  }

  const height = 800
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
        {showCode && <SandpackCodeEditor style={{ height }} />}
        <SandpackPreview style={{ height }} />
      </SandpackLayout>
    </SandpackProvider>
  )
}

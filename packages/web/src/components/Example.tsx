'use client'

import { Sandpack } from '@codesandbox/sandpack-react'
import { FunctionComponent } from 'react'

export interface ExampleProps {
  masonry: string
  app: string
}

export const Example: FunctionComponent<ExampleProps> = (props) => {
  return (
    <Sandpack
      template="vite-react"
      files={{
        'App.jsx': props.app,
        './node_modules/react-masonry/package.json': JSON.stringify({
          name: 'react-masonry',
          main: './dist/index.js',
        }),
        './node_modules/react-masonry/dist/index.js': props.masonry,
      }}
      customSetup={{
        dependencies: {
          react: '^18.2.0',
          'react-masonry': '*',
        },
      }}
    />
  )
}

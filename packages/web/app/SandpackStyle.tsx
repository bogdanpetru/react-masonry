'use client'

import { getSandpackCssText } from '@codesandbox/sandpack-react'
import { FunctionComponent, ReactNode } from 'react'

const cssTextOutput = getSandpackCssText()

export const SandpackStyle: FunctionComponent = () => {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: cssTextOutput }}
      id="sandpack"
      key="sandpack-css"
    />
  )
}

import { FunctionComponent } from 'react'
import { getSandpackCssText } from '@codesandbox/sandpack-react'

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

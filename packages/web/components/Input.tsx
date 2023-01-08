import * as React from 'react'
import styled from 'styled-components'

const SInput = styled.input`
  margin-left: 10px;
  height: 30px;
  border-radius: 6px;
  border: 0;
  padding: 0 8px;
`

export const Input: React.FC<{
  type: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = (props) => {
  return <SInput {...props} />
}

import { useState } from 'react'
import styled from 'styled-components'
import { RelativeWidthsExample } from './examples/RelativeWidthsExample'
import { Label } from '@app/components/Label'


const ExamplesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const ControlsWrapper = styled.div`
  margin-bottom: 30px;
  width: 300px;
  margin: 0 auto;
`

console.log({Label})

export const Examples = () => {
  const [numberOfBoxes, setCardsNumber] = useState(20)
  const [gutter, setGutter] = useState(50)

  return (
    <ExamplesWrapper>
      <ControlsWrapper>
        <Label>
          Number of images:
          <input
            type="number"
            value={numberOfBoxes}
            onChange={(event) => setCardsNumber(event.target.value)}
          />
        </Label>
        <Label>
          Gutter size:
          <input
            type="number"
            value={gutter}
            onChange={(event) => setGutter(event.target.value)}
          />
        </Label>
      </ControlsWrapper>
      <RelativeWidthsExample
        gutter={gutter}
        numberOfBoxes={numberOfBoxes}
      />
    </ExamplesWrapper>
  )
}

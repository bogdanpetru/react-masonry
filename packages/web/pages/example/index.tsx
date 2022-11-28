import { useState } from 'react'
import styled from 'styled-components'
import { RelativeWidthsExample } from '../../examples/RelativeWidthsExample'
import { Label } from '../../components/Label'

const ExamplesWrapper = styled.div`
  padding: 0 0 100px;
  max-width: 1200px;
  margin: 0 auto;
`

const ControlsWrapper = styled.div`
  margin-bottom: 30px;
  width: 300px;
`

const Examples = () => {
  const [numberOfBoxes, setCardsNumber] = useState(20)
  const [gutter, setGutter] = useState(20)

  return (
    <ExamplesWrapper>
      <h2>Example</h2>
      <ControlsWrapper>
        <Label>
          Number of images:
          <input
            type="number"
            value={numberOfBoxes}
            onChange={(event) => setCardsNumber(parseInt(event.target.value))}
          />
        </Label>
        <Label>
          Gutter size:
          <input
            type="number"
            value={gutter}
            onChange={(event) => {
              let value = parseInt(event.target.value)
              if (!isNaN(value) && typeof value === 'number') {
                setGutter(value)
              }
            }}
          />
        </Label>
      </ControlsWrapper>
      <RelativeWidthsExample gutter={gutter} numberOfBoxes={numberOfBoxes} />
    </ExamplesWrapper>
  )
}

export default Examples

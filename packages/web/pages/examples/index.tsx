import * as React from 'react'
import styled from 'styled-components'
import { RelativeWidthsExample } from '../../examples/RelativeWidths'
import { Label } from '../../components/Label'
import { Input } from '../../components/Input'
import { PageSubTitle } from '../../components/PageTitle'

const ExamplesWrapper = styled.div`
  padding: 0 0 100px;
  margin: 0 auto;
`

const ControlsWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  /* width: 300px; */
`

const Examples = () => {
  const [numberOfBoxes, setCardsNumber] = React.useState(20)
  const [gutter, setGutter] = React.useState(20)

  return (
    <ExamplesWrapper>
      <PageSubTitle>Relative Widths</PageSubTitle>
      <ControlsWrapper>
        <Label>
          Number of images
          <Input
            type="number"
            value={numberOfBoxes}
            onChange={(event) => setCardsNumber(parseInt(event.target.value))}
          />
        </Label>
        <Label>
          Gutter size
          <Input
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

import * as React from 'react'
import styled from 'styled-components'
import { Text } from '../../src/components/Text'
import { PageSubTitle } from '../../src/components/PageTitle'
import { Masonry } from 'react-masonry'
import { useImages } from '@/utils/useImages'

const ExamplesWrapper = styled.div`
  padding: 0 0 100px;
  margin: 0 auto;
`

const Examples = () => {
  const numberOfBoxes = 30
  const gutter = 30
  const { images, boxes } = useImages({ numberOfBoxes, gutter })

  return (
    <ExamplesWrapper>
      <PageSubTitle>Image gallery</PageSubTitle>
      <Text>Images have random heights and widths use variable widths.</Text>

      <Masonry gutter={gutter} transition="fadeMove">
        {boxes.slice(0, numberOfBoxes).map((box, index) => {
          const img = images[index]
          if (!img) {
            return <div>loading</div>
          }
          return (
            <div
              key={index}
              style={{
                ...box,
                height: img.height,
                backgroundImage: `url(${img.url})`,
              }}
            ></div>
          )
        })}
      </Masonry>
    </ExamplesWrapper>
  )
}

export default Examples

import { Navigation } from './Navigation'
import styled from 'styled-components'

const StyleHeader = styled.header`
  display: flex;
  align-items: center;
  width: 80vw;
  max-width: 860px;
  margin: 0 auto;
  flex-direction: column;
  margin-bottom: 40px;
`

export const Header = () => {
  return (
    <StyleHeader>
      <h1 className="title">React Masonry</h1>
      <Navigation />
    </StyleHeader>
  )
}

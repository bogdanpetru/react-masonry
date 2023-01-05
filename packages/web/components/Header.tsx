import { Navigation } from './Navigation'
import styled from 'styled-components'

const StyleHeader = styled.header`
  width: 180px;
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

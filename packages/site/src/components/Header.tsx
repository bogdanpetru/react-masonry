import { Navigation } from './Navigation'
import styled from 'styled-components'

const StyleHeader = styled.header`
  padding: 40px;
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

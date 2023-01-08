import { Logo } from './Logo'
import { Navigation } from './Navigation'
import styled from 'styled-components'

const StyleHeader = styled.header`
  display: flex;
  align-items: center;
  max-width: 860px;
  margin: 50px auto 0;
`

export const Header = () => {
  return (
    <StyleHeader>
      <Logo />
      <h1 className="title">React Masonry</h1>
      <Navigation />
    </StyleHeader>
  )
}

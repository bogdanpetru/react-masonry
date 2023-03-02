import { Logo } from './Logo'
import { Navigation } from './Navigation'
import styled from 'styled-components'

const StyleHeader = styled.header`
  display: flex;
  align-items: center;
  margin: 50px auto 50px;
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

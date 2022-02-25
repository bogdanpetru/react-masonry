import React from 'react'
import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  margin: 0 0 20px;
  text-decoration: none;
  font-weight: 300;
  font-size: 18px;

  &[data-active='true'] {
    color: var(--primary-color);
    font-weight: 500;
  }
`

const NavLink: React.FunctionComponent<{ to: string }> = ({ to, children }) => {
  const resolved = useResolvedPath(to)
  const match = useMatch({ path: resolved.pathname, end: true })
  return (
    <StyledLink data-active={Boolean(match)} to={to}>
      {children}
    </StyledLink>
  )
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Navigation = () => {
  return (
    <StyledNavigation>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/examples">Examples</NavLink>
      <NavLink to="/api">API</NavLink>
    </StyledNavigation>
  )
}

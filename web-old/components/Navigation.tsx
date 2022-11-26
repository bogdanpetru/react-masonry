import React from 'react'

import styled from 'styled-components'

const StyledLink = styled.a`
  margin: 0 0 20px;
  text-decoration: none;
  font-weight: 300;
  font-size: 18px;

  &[data-active='true'] {
    color: var(--primary-color);
    font-weight: 500;
  }
`

export interface NavLinkProps {
  to: string
  children: React.ReactNode
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({ to, children }) => {
  return (
    <StyledLink data-active={true} href={to}>
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
      <NavLink to="/example">Example</NavLink>
      <NavLink to="/api">API</NavLink>
    </StyledNavigation>
  )
}

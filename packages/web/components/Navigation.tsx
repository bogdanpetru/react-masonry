import * as React from 'react'

import styled from 'styled-components'

const StyledLink = styled.a`
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
  target?: string
}

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  to,
  children,
  target,
}) => {
  return (
    <StyledLink data-active={true} href={to} target={target}>
      {children}
    </StyledLink>
  )
}

const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-left: auto;
`

export const Navigation = () => {
  return (
    <StyledNavigation>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/examples">Examples</NavLink>
      <NavLink to="/docs">Docs</NavLink>
      <NavLink
        target="_blank"
        to="https://github.com/bogdanpetru/react-masonry"
      >
        Github
      </NavLink>
    </StyledNavigation>
  )
}

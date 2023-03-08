import * as React from 'react'

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
    <a className="navigation-link" data-active={true} href={to} target={target}>
      {children}
    </a>
  )
}

export const Navigation = () => {
  return (
    <nav className="navigation">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/examples">Examples</NavLink>
      <NavLink to="/docs">Docs</NavLink>
      <NavLink
        target="_blank"
        to="https://github.com/bogdanpetru/react-masonry"
      >
        Github
      </NavLink>
    </nav>
  )
}

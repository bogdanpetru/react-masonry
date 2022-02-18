import React from 'react';
import { Link, useResolvedPath, useMatch } from 'react-router-dom'
import { navigationClassName, navigationItemClassName } from './style.css'

const NavLink: React.FunctionComponent<{ to: string, }> = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link data-active={Boolean(match)} className={navigationItemClassName} to={to}>
      {children}
    </Link>
  )
}


export const Navigation = () => {
  return (
    <nav className={navigationClassName}>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/examples">
        Examples
      </NavLink>
      <NavLink to="/api">
        API
      </NavLink>
    </nav>
  )
}

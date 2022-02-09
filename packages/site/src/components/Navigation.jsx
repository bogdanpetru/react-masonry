import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav>
      <Link className="navigation-item" to="/">
        Home
      </Link>
      <Link className="navigation-item" to="/examples">
        Examples
      </Link>
      <Link className="navigation-item" to="/api">
        API
      </Link>
    </nav>
  )
}

import React from 'react'
import { render } from 'react-dom'

const App = () => {
  return <div>
    Hello world
  </div>
}

render(
  <App />,
  document.getElementById('main')
)
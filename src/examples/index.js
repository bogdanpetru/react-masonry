import React from 'react'
import { render } from 'react-dom'
import Masonry from '../components/Masonry'

const App = () => {
  return <div>
    Hello world
    <Masonry />
  </div>
}

render(
  <App />,
  document.getElementById('main')
)

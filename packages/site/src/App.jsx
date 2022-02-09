import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './views/home'
import { Api } from './views/api'

import './App.css'
import { Navigation } from './components/Navigation'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <h1 className="title">React Masonry</h1>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Api />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Api } from './views/Api'
import { Examples } from './views/Examples'
import { Header } from './components/Header'

import './App.css'
import { Navigation } from './components/Navigation'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api" element={<Api />} />
        <Route path="/examples" element={<Examples />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

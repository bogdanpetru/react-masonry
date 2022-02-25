import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Api } from './views/Api'
import { Examples } from './views/Examples'
import { Header } from './components/Header'

import './App.css'
import styled from 'styled-components'

const AppWrapper = styled.div`
  display: flex;
`

const Main = styled.main`
  flex: 1;
`

const HeaderWrapper = styled.header`
  width: 300px;
`

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api" element={<Api />} />
            <Route path="/examples" element={<Examples />} />
          </Routes>
        </Main>
      </AppWrapper>
    </BrowserRouter>
  )
}

export default App

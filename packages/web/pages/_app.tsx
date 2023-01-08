import '../styles/globals.css'
import type { AppProps } from 'next/app'

import styled from 'styled-components'
import { Header } from '../components/Header'

const AppWrapper = styled.div``

const Main = styled.main``

const HeaderWrapper = styled.header``

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Main>
        <Component {...pageProps} />
      </Main>
    </AppWrapper>
  )
}

export default MyApp

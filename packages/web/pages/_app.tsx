import '../styles/globals.css'
import type { AppProps } from 'next/app'

import styled from 'styled-components'
import { Header } from '../components/Header'

const AppWrapper = styled.div`
  display: flex;
`

const Main = styled.main`
  padding-top: 80px;
  flex: 1;
`

const HeaderWrapper = styled.header`
  padding-left: 40px;
  padding-top: 20px;
  width: 300px;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Main>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </Main>
    </AppWrapper>
  )
}

export default MyApp

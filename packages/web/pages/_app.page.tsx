import type { AppProps } from 'next/app'
import Head from 'next/head'
import styled from 'styled-components'
import '../styles/globals.css'
import { Header } from '../src/components/Header'

const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Main = styled.main``

const HeaderWrapper = styled.header``

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Head>
        <title>React Masonry</title>
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
      </Head>
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

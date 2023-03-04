import { Logo } from '@/components/Logo'
import './styles.css'
import { Navigation } from '@/components/Navigation'
import { SandpackStyle } from './SandpackStyle'

export const metadata = {
  title: 'React Masonry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <SandpackStyle />
      </head>
      <body>
        <main className="app-wrapper">
          <header>
            <Logo />
            <h1 className="title">React Masonry</h1>
            <Navigation />
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}

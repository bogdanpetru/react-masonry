import { Navigation } from './Navigation'
import { headerCassName } from './Header.css';

export const Header = () => {
  return (
    <header className={headerCassName}>
      <h1 className="title">React Masonry</h1>
      <Navigation />
    </header>
  )
}

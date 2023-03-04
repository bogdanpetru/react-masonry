import { Masonry } from 'react-masonry'

export default function App() {
  const data = 'world'

  return (
    <>
      <h1>Dude</h1>
      <Masonry>
        <div style={{ width: 100, height: 100, backgroundColor: 'red' }}>1</div>
        <div style={{ width: 100, height: 100, backgroundColor: 'blue' }}>
          2
        </div>
      </Masonry>
    </>
  )
}

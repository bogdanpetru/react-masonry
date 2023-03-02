import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <main>
      <div>
        <h1>Introduction</h1>
        <p>ReactJs layout library.</p>
        <p>
          Places stones (elements) in optimal positions by stacking them from
          left to right and from top to bottom.
        </p>
        <p>
          Elements rendered inside Masonry must be{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements"
          >
            DOM elements
          </a>
          .
        </p>
        <p>Stacking process has the following steps:</p>
        <ul>
          <li>clone elements, save a reference (ref)</li>
          <li>render elements hidden, measure</li>
          <li>run position algorithm</li>
          <li>rerender elements with calculated position</li>
        </ul>
      </div>
    </main>
  )
}

export default Home

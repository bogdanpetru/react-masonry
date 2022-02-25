import styled from 'styled-components'

const HomeWrapper = styled.div`
  padding-top: 100px;
  max-width: 640px;
  margin: 0 auto;
`

export const Home = () => {
  return (
    <HomeWrapper>
      <main>
        <div>
          <h2>Introduction</h2>
          <p>
            ReactJs layout library inspired by{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/desandro/masonry"
            >
              Masonry.
            </a>
          </p>
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
        <h2>Api</h2>
        <p>
          See{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/bogdanpetru/react-masonry"
          >
            README.md
          </a>
          .
        </p>
      </main>
    </HomeWrapper>
  )
}

# react masonry

ReactJs layout library.

It places elements in optimal positions by stacking them from left to right and from top to bottom.

No deps besides ReactJs ⚛️.

See [Demo](https://react-masonry.bogdanpetru.eu/examples/).

## Usage

Place any elements inside the Masonry component. They will be cloned, measured and positioned.

Elements rendered inside Masonry must be [DOM elements](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements).

```jsx
import { Masonry } from 'react-masonry'

return (
  <Masonry>
    <img src="helloWolrd.jpg" />
    <div className="box">some text</div>
    <img src="foo.png" />
  </Masonry>
)
```

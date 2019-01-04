# react masonry

ReactJs layout library inspired by [Masonry](https://github.com/desandro/masonry).

It places elements in optimal positions by stacking them from left to right and from top to bottom.

See [Demo](https://bogdanpetru.github.io/react-masonry/).


**This component is in development, any help is welcome :).**

## Usage

Place any elements inside the Masonry component. They will be cloned, measured and positioned.

Elements rendered inside Masonry must be [DOM elements](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements).


```jsx
import Mansonry from 'react-masonry'

return <Masonry>
  <img src="helloWolrd.jpg" />
  <div className="box">some text</div>
  <img src="foo.png" />
</Masonry>
```

## Install

Clone project.

> run `yarn install` or `npm install`

> run `yarn start` or `npm start` - will open in browser the demo (localhost:3000).

## Api:

[Api link](https://github.com/bogdanpetru/react-masonry/blob/master/api.md)

## TODO

- [x] simplify and remove img logic
- [ ] add tests for covered cases validate stones
- [ ] fix edge case where an item is bigger than the container
- [ ] add prettier
- [ ] update stone positions on props change that influence positioning
- [ ] add possibility to stack in different ways

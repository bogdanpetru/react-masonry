# react masonry

ReactJs layout library inspired by [Masonry](https://github.com/desandro/masonry).

It places elements in optimal positions by stacking them from left to right and from top to bottom.

See [Demo](https://bogdanpetru.github.io/react-masonry/).


**This component is in development, any help is welcome :).**

## Usage

Place any elements inside the Masonry component. They will be cloned, measured and positioned.

Elements rendered inside Masonry must be [DOM elements](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements).


```jsx
import {Masonry} from 'react-masonry'

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

- [x] `gutter`: number|{top, left, right, bottom} - 0

Space around stones. Specify a `number` for all 4 directions or specify for desired directions with an object.

- [x] `transition`: fade|fadeMove|false - fade

if different than false, each item will appear one after another with an interval of `transitionStep` in between.

Whether place stones one after another using an animation.

- [x] `transitionStep`: number - 50in ms, time in between each stone placement, this is relevant if `transition` prop is not `false`.

- [x] `transitionDuration`: number - 300
 Transition duration in ms.

 Speed with which stones are placed when `enterOneAfterAnother=true`

- [x] `updateOnWindowResize`: bool - true

 Whether to calculate again positions when Windows changes size.

- [x] `updateOnWindowResizeDebounceWait`: number - 300

Related to `updateOnWindowResize`.
Window resize listener is debouced, this sets the wait time.

- [ ] Customize specific stones in different way

 These props can be also added on div element like so:

`data-masonry-settings={{ gutter: 20, offset: { bottom: 20 } }}`


## TODO

- [x] simplify and remove img logic
- [ ] add tests for covered cases validate stones
- [ ] fix edge case where an item is bigger than the container
- [ ] add prettier
- [ ] update stone positions on props change that influence positioning
- [ ] add possibility to stack in different ways

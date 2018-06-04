# react masonry

[Masonry](https://github.com/desandro/masonry)  like  component implemented in react.
Places elements in optimal positions by stacking them from left to right and from top to bottom.
 

**This component is in development, any help is welcome :).**

## Usage

Place any elements inside the Masonry component. They will be cloned, measured and positioned.

Elements rendered inside Masonry must be [DOM elements](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements).


```jsx
import Mansonry, { Brick } from 'react-masonry'

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

-  [x] `gutter`: number|{top, left, right, bottom} - default: 0

Space around stones. Specify a `number` for all 4 directions or specify for desired directions with an object.

- [x] `transition`: fade|fadeMove|false - fade

 Whether place stones one after another using an animation.

- [x] `transitionStep`: number - 50 - in ms, time in between each stone placement, this is relevant if `transition` prop is not `false`.

- [x] `transitionDuration`: number - 300

 Transition duration in ms.

- [ ] `enterOneAfterAnother`: bool - true

 Whether stones are placed one after another with a delay (oneAfterAnotherDelay) between them.

- [ ] `oneAfterAnotherDelay`: number - 100

 Speed with which stones are placed when `enterOneAfterAnother=true`

- [ ] `updateOnWindowResize`: bool - true

 Whether to calculate again positions when Windows changes size.


- [ ] Customize specific stones in different way

 These props can be also added on div element like so:

`data-masonry-settings={{ gutter: 20, offset: { bottom: 20 } }}`

- [ ] `renderAfterImagesLoaded`: boolean - true

Render after all images have loaded

## TODO

- [ ] update tests where needed
- [ ] add tests for covered cases validate stones
- [ ] fix edge case where an item is bigger than the container
- [ ] add tests for props
- [ ] add prettier

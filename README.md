# react masonry

**This component is in development, any help is welcome :).**

## Usage

```jsx
import Mansonry, { Brick } from 'react-masonry'

return <Masonry >
  <img src="helloWolrd.jpg" />
  <div className="box">some text</div>
  <img src="foo.png" />
</Masonry>
```


## Descriotion

React Masonry, like [Masonry](https://github.com/desandro/masonry) but in React.

Places stones (elements) in optimal positions by stacking them from left to right and from top to bottom.

Elements rendered inside Masonry must be [DOM elements](https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html#dom-elements).

Stacking process has the following steps:
- cloning the elements and adding a reference
- mesuring elements after first render
- run position algorithm
- add style prop with position


## Api:

##### gutter: number|{top, left, right, bottom} - default: 0

Space around stones. Specify a `number` for all 4 directions or specify for desired directions with an object.

##### transition: fade|fadeMove|false - fade

Whether place stones one after another using an animation.

##### transitionDudation: number - 150

Transition duration in ms.

##### enterOneAfterAnother: bool - true

Whether stones are placed one after another with a delay (oneAfterAnotherDelay) between them.

##### oneAfterAnotherDelay: number - 100

Speed with which stones are placed when `enterOneAfterAnother=true`

##### updateOnWindowResize: bool - true

Whether to calculate again positions when Windows changes size.

##### updatePositions: method

Call to reposition stones.

#### Customize specific stones in different way

These props can be also added on div element like so:

`data-masonry-settings={{ gutter: 20, offset: { bottom: 20 } }}`



## Fetures

- [ ] items can have set dimensions, if they are not set they will be read from the dom
- [ ] declarative way to set responsive dimensions
- [ ] items can enter async
- [ ] use styled component
- [x] airbnb eslint
- [x] images are mounted when they load

## TODO
- [x] install flow
- [x] configure webpack 2
- [x] get hello world
- [x] basic project structure
- [x] configure jest
- [x] add editor config
- [x] add eslint
- [x] remove ramnda dep
- [ ] add cosmos
- [ ] add precomit hook with linting
- [ ] add commit hook with test runner with clicle ci

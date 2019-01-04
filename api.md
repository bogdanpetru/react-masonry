# Api

###  [x] `gutter`: number|{top, left, right, bottom} - 0

Space around stones. Specify a `number` for all 4 directions or specify for desired directions with an object.

### [x] `transition`: fade|fadeMove|false - fade

if different than false, each item will appear one after another with an interval of `transitionStep` in between.

 Whether place stones one after another using an animation.

### [x] `transitionStep`: number - 50
in ms, time in between each stone placement, this is relevant if `transition` prop is not `false`.

### [x] `transitionDuration`: number - 300

 Transition duration in ms.

 Speed with which stones are placed when `enterOneAfterAnother=true`

### [x] `updateOnWindowResize`: bool - true

 Whether to calculate again positions when Windows changes size.

### [x] `updateOnWindowResizeDebounceWait`: number - 300

Related to `updateOnWindowResize`.
Window resize listener is debouced, this sets the wait time.

### [ ] Customize specific stones in different way

 These props can be also added on div element like so:

`data-masonry-settings={{ gutter: 20, offset: { bottom: 20 } }}`

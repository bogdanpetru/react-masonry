# react masonry

**This component is in development, any help is welcome :).**

Pure react masonry clone. No other dependencies beside ReactJs.

## Usage

```jsx
import Mansonry, { Brick } from 'react-masonry'

return <Masonry>
    <Brick width={300}></Brick>
    <Brick maxWidth={200}></Brick>
    <Brick minWidth={300></Brick>
    <Brick></Brick>
</Masonry>
```

## Fetures

- [ ] items can have set dimensions, if they are not set they will be read from the dom
- [ ] declarative way to set responsive dimensions
- [ ] images are mounted when they load
- [ ] items can enter async
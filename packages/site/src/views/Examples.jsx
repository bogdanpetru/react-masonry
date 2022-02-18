import { useState } from 'react'
import { RelativeWidthsExample } from './examples/RelativeWidthsExample'

export const Examples = () => {
  const options = [
    {
      id: 'right-bottom',
      label: 'right, bottom',
    },
    {
      id: 'left-bottom',
      label: 'left, bottom',
    },
    {
      id: 'right-top',
      label: 'right, top',
    },
    {
      id: 'left-top',
      label: 'left, top',
    },
  ]

  const [numberOfBoxes, setCardsNumber] = useState(30)
  const [gutter, setGutter] = useState(10)
  const [stacking, setStacking] = useState(3)

  return (
    <div style={{ width: 860, margin: '0 auto' }}>
      <main style={{ marginBottom: 30 }}>
        <select onChange={(event) => setStacking(event.target.value)}>
          {options.map((item, key) => (
            <option value={item.id}>{item.label}</option>
          ))}
        </select>
        <input
          type="number"
          value={numberOfBoxes}
          onChange={(event) => setCardsNumber(event.target.value)}
        />
        <input
          type="number"
          value={gutter}
          onChange={(event) => setGutter(event.target.value)}
        />
      </main>
      <RelativeWidthsExample
        stacking={stacking}
        gutter={gutter}
        numberOfBoxes={numberOfBoxes}
      />
    </div>
  )
}

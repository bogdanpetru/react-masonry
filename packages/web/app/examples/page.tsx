import { ExampleServer } from '../components/ExampleServer'

const Examples = () => {
  return (
    <>
      <ExampleServer useImages imagesApi app="/app/examples/example.tsx" />
    </>
  )
}

export default Examples

import { createEffect, createSignal } from 'solid-js'
import { Environment, useEnvironmentContext } from '../..'

const PrintEnvironment = () => {
  const getRootNode = useEnvironmentContext()
  const [rootNode, setRootNode] = createSignal(getRootNode?.())

  createEffect(() => {
    setRootNode(getRootNode?.())
    console.log(rootNode())
  })

  return <pre>{rootNode()?.toString()}</pre>
}

export const Basic = () => (
  <Environment>
    <PrintEnvironment />
  </Environment>
)

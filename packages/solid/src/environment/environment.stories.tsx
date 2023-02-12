import { createEffect, createSignal } from 'solid-js'
import { Environment } from './environment'
import { useEnvironmentContext } from './environment-context'

const PrintEnvironment = () => {
  const getRootNode = useEnvironmentContext()
  const [rootNode, setRootNode] = createSignal(getRootNode?.())

  createEffect(() => {
    setRootNode(getRootNode?.())
  })

  return <pre>{rootNode()?.toString()}</pre>
}

export const Basic = () => (
  <Environment>
    <PrintEnvironment />
  </Environment>
)

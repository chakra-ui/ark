import { createEffect, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Environment } from './environment'
import { useEnvironmentContext } from './environment-context'

const meta: Meta = {
  title: 'Environment',
}

export default meta

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

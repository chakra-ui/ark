import { createEffect, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Environment, useEnvironmentContext } from '../'

const meta: Meta = {
  title: 'Components / Environment',
}

export default meta

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

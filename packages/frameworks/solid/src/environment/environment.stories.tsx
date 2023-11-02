import { createEffect, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Environment, useEnvironmentContext } from './'

type EnvironmentType = typeof Environment

const meta: Meta<EnvironmentType> = {
  title: 'Environment',
  component: Environment,
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
  <Environment.Root>
    <PrintEnvironment />
  </Environment.Root>
)

import { createEffect, createSignal } from 'solid-js'
import { render, screen } from 'solid-testing-library'
import { Environment, useEnvironmentContext } from '.'
import type { EnvironmentContext } from './environment-context'

const PrintEnvironment = () => {
  const getRootNode = useEnvironmentContext()
  const [rootNode, setRootNode] = createSignal<
    ReturnType<NonNullable<EnvironmentContext>> | undefined
  >(undefined)

  createEffect(() => {
    setRootNode(getRootNode?.())
  })

  return <pre aria-label="environment values">{rootNode()?.toString()}</pre>
}

const ComponentUnderTest = () => (
  <Environment value={document}>
    <PrintEnvironment />
  </Environment>
)

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    render(() => <ComponentUnderTest />)
    expect(screen.getByLabelText('environment values').innerHTML).toMatchInlineSnapshot(
      '"[object Document]"',
    )
  })
})

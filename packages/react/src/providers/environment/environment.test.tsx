import { render, screen } from '@testing-library/react'
import { EnvironmentProvider } from '@ark-ui/react/environment'
import { useEnvironmentContext } from './use-environment-context.ts'

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre data-testid="output">{getRootNode()?.nodeName}</pre>
}

describe('EnvironmentProvider', () => {
  it('should have access to the environment values', async () => {
    render(
      <EnvironmentProvider value={() => document}>
        <PrintEnvironment />
      </EnvironmentProvider>,
    )
    expect(screen.getByTestId('output').innerHTML).not.toBe('""')
  })
})

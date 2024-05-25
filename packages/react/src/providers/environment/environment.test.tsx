import { render, screen } from '@testing-library/react'
import { EnvironmentProvider } from './'
import { useEnvironmentContext } from './use-environment-context'

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre data-testid="output">{JSON.stringify(getRootNode(), null, 2)}</pre>
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

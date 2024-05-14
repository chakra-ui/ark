import { render, screen } from '@testing-library/react'
import { Environment } from './'
import { useEnvironmentContext } from './use-environment-context'

const PrintEnvironment = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre data-testid="output">{JSON.stringify(getRootNode(), null, 2)}</pre>
}

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    render(
      <Environment value={() => document}>
        <PrintEnvironment />
      </Environment>,
    )
    expect(screen.getByTestId('output').innerHTML).not.toBe('""')
  })
})

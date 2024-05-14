import { render, screen } from '@solidjs/testing-library'
import { Environment, useEnvironmentContext } from './'

const PrintEnvironment = () => {
  const environment = useEnvironmentContext()

  return <pre>{environment().getRootNode().toString()}</pre>
}

describe('Environment', () => {
  it('should have access to the environment values', async () => {
    render(() => (
      <Environment value={() => document}>
        <PrintEnvironment />
      </Environment>
    ))
    expect(screen.getByText('[object Document]')).toBeInTheDocument()
  })
})

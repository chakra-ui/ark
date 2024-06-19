import { render, screen } from '@solidjs/testing-library'
import { EnvironmentProvider, useEnvironmentContext } from './'

const PrintEnvironment = () => {
  const environment = useEnvironmentContext()

  return <pre>{environment().getRootNode().toString()}</pre>
}

describe('EnvironmentPrvovider', () => {
  it('should have access to the environment values', async () => {
    render(() => (
      <EnvironmentProvider value={() => document}>
        <PrintEnvironment />
      </EnvironmentProvider>
    ))
    expect(screen.getByText('[object Document]')).toBeInTheDocument()
  })
})

import { Environment, useEnvironmentContext } from '../..'

export const Basic = () => (
  <Environment>
    <PrintEnvironment />
  </Environment>
)

const PrintEnvironment = () => {
  const environment = useEnvironmentContext()

  return <pre>{JSON.stringify(environment().getRootNode(), null, 2)}</pre>
}

import { useEnvironmentContext } from '../use-environment-context'

export const Usage = () => {
  const environment = useEnvironmentContext()

  return <pre>{JSON.stringify(environment().getRootNode(), null, 2)}</pre>
}

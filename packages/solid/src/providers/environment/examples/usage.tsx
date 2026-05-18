import { useEnvironmentContext } from '../use-environment-context.ts'

export const Usage = () => {
  const environment = useEnvironmentContext()

  return <pre>{JSON.stringify(environment().getRootNode(), null, 2)}</pre>
}

import { useEnvironmentContext } from '@ark-ui/react/environment'

export const Usage = () => {
  const { getRootNode } = useEnvironmentContext()

  return <pre>{JSON.stringify(getRootNode(), null, 2)}</pre>
}

import { compact } from '../compact'
import { useEnvironmentContext } from './environment-context'

export type UseEnvironmentReturn = ReturnType<typeof useEnvironment>

export const useEnvironment = <Context extends Record<string, unknown>>(context: Context) => {
  const environment = useEnvironmentContext()
  return { ...environment, ...compact(context) }
}

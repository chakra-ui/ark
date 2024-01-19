import { EnvironmentRoot, type EnvironmentProps } from './environment'
import { useEnvironmentContext, type EnvironmentContext } from './environment-context'

export const Environment = {
  Root: EnvironmentRoot,
}

export { Environment, useEnvironmentContext }
export type { EnvironmentContext, EnvironmentProps }

import { Environment as EnvironmentRoot, type EnvironmentProps } from './environment'
import { useEnvironmentContext, type EnvironmentContext } from './environment-context'

const Environment = Object.assign(EnvironmentRoot, {
  Root: EnvironmentRoot,
})

export { Environment, useEnvironmentContext }
export type { EnvironmentContext, EnvironmentProps }

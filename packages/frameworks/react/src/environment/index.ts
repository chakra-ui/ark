import { Environment as EnvironmentRoot, type EnvironmentProps } from './environment'
import { useEnvironmentContext } from './environment-context'

const Environment = Object.assign(EnvironmentRoot, {
  Root: EnvironmentRoot,
})

export { Environment, useEnvironmentContext }
export type { EnvironmentProps }

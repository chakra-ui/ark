import { useMemo, type ReactNode } from 'react'
import { EnvironmentProvider, type EnvironmentContext } from './environment-context'

export type EnvironmentProps = EnvironmentContext & {
  children?: ReactNode
}

export const Environment = (props: EnvironmentProps) => {
  const { dir, getRootNode, children } = props
  const currentEnv = useMemo(() => ({ dir, getRootNode }), [dir, getRootNode])
  return <EnvironmentProvider value={currentEnv}>{children}</EnvironmentProvider>
}

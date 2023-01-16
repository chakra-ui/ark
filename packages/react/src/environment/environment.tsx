import { useMemo, useRef, type ReactNode } from 'react'
import { EnvironmentProvider, type EnvironmentContext } from './environment-context'

export type EnvironmentProps = EnvironmentContext & {
  children?: ReactNode
}

export const Environment = (props: EnvironmentProps) => {
  const { getRootNode: getRootNodeProp, children } = props
  const ref = useRef<HTMLSpanElement>(null)

  const currentEnv = useMemo(() => {
    const getRootNode = getRootNodeProp ?? (() => ref.current?.ownerDocument ?? document)
    return { getRootNode }
  }, [getRootNodeProp])
  const showSpan = !getRootNodeProp

  return (
    <EnvironmentProvider value={currentEnv}>
      {children}
      {showSpan && <span hidden ref={ref} />}
    </EnvironmentProvider>
  )
}

import { useMemo, useRef, type ReactNode } from 'react'
import { EnvironmentProvider } from './environment-context'

export type EnvironmentProps = {
  children?: ReactNode
  value?: ShadowRoot | Document | Node
}

export const Environment = (props: EnvironmentProps) => {
  const { value, children } = props
  const ref = useRef<HTMLSpanElement>(null)

  const currentEnv = useMemo(() => () => value ?? ref.current?.ownerDocument ?? document, [value])
  const showSpan = !value

  return (
    <EnvironmentProvider value={currentEnv}>
      {children}
      {showSpan && <span hidden ref={ref} />}
    </EnvironmentProvider>
  )
}

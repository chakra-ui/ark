import { useMemo, useRef, type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import { EnvironmentProvider } from './use-environment-context'

export type RootNode = ShadowRoot | Document | Node

export interface EnvironmentProps {
  children?: ReactNode
  value?: RootNode | (() => RootNode)
}

export const Environment = (props: EnvironmentProps) => {
  const { value, children } = props
  const ref = useRef<HTMLSpanElement>(null)

  const getRootNode = useMemo(() => {
    return () => runIfFn(value) ?? ref.current?.ownerDocument ?? document
  }, [value])

  const showSpan = !value

  return (
    <EnvironmentProvider value={getRootNode}>
      {children}
      {showSpan && <span data-ark-env="" hidden ref={ref} />}
    </EnvironmentProvider>
  )
}

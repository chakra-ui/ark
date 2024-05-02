import { getDocument, getWindow } from '@zag-js/dom-query'
import { type ReactNode, useMemo, useRef } from 'react'
import { runIfFn } from '../../utils/run-if-fn'
import { EnvironmentProvider, type RootNode } from './use-environment-context'

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

  const context = useMemo(
    () => ({
      getRootNode,
      getWindow: () => getWindow(getRootNode()),
      getDocument: () => getDocument(getRootNode()),
    }),
    [getRootNode],
  )

  return (
    <EnvironmentProvider value={context}>
      {children}
      {showSpan && <span data-ark-env="" hidden ref={ref} />}
    </EnvironmentProvider>
  )
}

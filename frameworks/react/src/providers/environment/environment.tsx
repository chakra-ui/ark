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
  const spanRef = useRef<HTMLSpanElement>(null)

  const getRootNode = useMemo(() => {
    return () => runIfFn(value) ?? spanRef.current?.ownerDocument ?? document
  }, [value])

  const environment = useMemo(
    () => ({
      getRootNode,
      getWindow: () => getWindow(getRootNode()),
      getDocument: () => getDocument(getRootNode()),
    }),
    [getRootNode],
  )

  return (
    <EnvironmentProvider value={environment}>
      {children}
      {!value && <span data-ark-env="" hidden ref={spanRef} />}
    </EnvironmentProvider>
  )
}

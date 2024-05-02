import { getDocument, getWindow } from '@zag-js/dom-query'
import { type ReactNode, useMemo, useState } from 'react'
import { runIfFn } from '../../utils/run-if-fn'
import { EnvironmentProvider, type RootNode } from './use-environment-context'

export interface EnvironmentProps {
  children?: ReactNode
  value?: RootNode | (() => RootNode)
}

export const Environment = (props: EnvironmentProps) => {
  const { value, children } = props
  const [spanRef, setSpanRef] = useState<HTMLSpanElement | null>()

  const getRootNode = useMemo(() => {
    return () => runIfFn(value) ?? spanRef?.ownerDocument ?? document
  }, [value, spanRef])

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
      {!value && <span hidden ref={setSpanRef} />}
    </EnvironmentProvider>
  )
}

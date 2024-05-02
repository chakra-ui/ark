import { getDocument, getWindow } from '@zag-js/dom-query'
import { type JSX, Show, createMemo, createSignal } from 'solid-js'
import { runIfFn } from '../../utils/run-if-fn'
import { EnvironmentProvider, type RootNode } from './use-environment-context'

export interface EnvironmentProps {
  children?: JSX.Element
  value?: RootNode | (() => RootNode)
}

export const Environment = (props: EnvironmentProps) => {
  const [spanRef, setSpanRef] = createSignal<HTMLSpanElement>()
  const getRootNode = () => runIfFn(props.value) ?? spanRef()?.ownerDocument ?? document

  const environment = createMemo(() => ({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  }))

  return (
    <EnvironmentProvider value={environment}>
      {props.children}
      <Show when={!props.value}>
        <span hidden ref={setSpanRef} />
      </Show>
    </EnvironmentProvider>
  )
}

import { getDocument, getWindow } from '@zag-js/dom-query'
import { type JSX, Show, createMemo, createSignal } from 'solid-js'
import { ark } from '../../components/factory'
import { runIfFn } from '../../utils/run-if-fn'
import { EnvironmentContextProvider, type RootNode } from './use-environment-context'

export interface EnvironmentProviderProps {
  children?: JSX.Element
  value?: RootNode | (() => RootNode)
}

export const EnvironmentProvider = (props: EnvironmentProviderProps) => {
  const [spanRef, setSpanRef] = createSignal<HTMLSpanElement>()
  const getRootNode = () => runIfFn(props.value) ?? spanRef()?.getRootNode() ?? document

  const environment = createMemo(() => ({
    getRootNode,
    getDocument: () => getDocument(getRootNode()),
    getWindow: () => getWindow(getRootNode()),
  }))

  return (
    <EnvironmentContextProvider value={environment}>
      {props.children}
      <Show when={!props.value}>
        <ark.span hidden ref={setSpanRef} />
      </Show>
    </EnvironmentContextProvider>
  )
}

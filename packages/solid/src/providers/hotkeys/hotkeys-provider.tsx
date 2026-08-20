import { type HotkeyStoreOptions, createHotkeyStore } from '@zag-js/hotkeys'
import { type JSX, createEffect, on, onCleanup, onMount } from 'solid-js'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'
import { HotkeyStoreContextProvider } from './use-hotkey-store.ts'

export interface HotkeysProviderProps extends Omit<HotkeyStoreOptions, 'target'> {
  children?: JSX.Element
}

export const HotkeysProvider = (props: HotkeysProviderProps) => {
  const env = useEnvironmentContext()

  const store = createHotkeyStore({
    activeScopes: props.activeScopes,
    conflictBehavior: props.conflictBehavior,
    defaultOptions: props.defaultOptions,
    sequenceTimeoutMs: props.sequenceTimeoutMs,
  })

  onMount(() => {
    store.init({ target: env().getRootNode() as Document, defaultOptions: props.defaultOptions })
    onCleanup(() => store.destroy())
  })

  createEffect(
    on(
      () => (props.activeScopes === undefined ? '' : String(props.activeScopes)),
      () => {
        if (props.activeScopes === undefined) return
        store.setScope(props.activeScopes)
      },
      { defer: true },
    ),
  )

  return <HotkeyStoreContextProvider value={store}>{props.children}</HotkeyStoreContextProvider>
}

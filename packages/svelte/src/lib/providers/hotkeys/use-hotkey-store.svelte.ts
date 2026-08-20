import { type HotkeyStore, createHotkeyStore } from '@zag-js/hotkeys'
import { createContext } from '$lib/utils/create-context'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export const [HotkeyStoreContextProvider, useHotkeyStoreContext] = createContext<() => HotkeyStore | undefined>({
  name: 'HotkeyStoreContext',
  strict: false,
  defaultValue: () => undefined,
})

let fallbackStore: HotkeyStore | undefined
let fallbackInitialized = false

const getFallbackStore = () => {
  if (!fallbackStore) fallbackStore = createHotkeyStore()
  return fallbackStore
}

export function useHotkeyStore(): HotkeyStore {
  const contextStore = useHotkeyStoreContext()?.()
  const env = useEnvironmentContext()
  const store = contextStore ?? getFallbackStore()

  $effect(() => {
    if (contextStore || fallbackInitialized) return
    fallbackInitialized = true
    store.init({ target: env().getRootNode() as Document })
  })

  return store
}

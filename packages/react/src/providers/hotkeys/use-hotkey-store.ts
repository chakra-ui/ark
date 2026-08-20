'use client'

import { type HotkeyStore, createHotkeyStore } from '@zag-js/hotkeys'
import { createContext } from '../../utils/create-context.ts'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect.ts'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export const [HotkeyStoreContextProvider, useHotkeyStoreContext] = createContext<HotkeyStore | undefined>({
  name: 'HotkeyStoreContext',
  hookName: 'useHotkeyStore',
  providerName: '<HotkeysProvider />',
  strict: false,
  defaultValue: undefined,
})

let fallbackStore: HotkeyStore | undefined
let fallbackInitialized = false

const getFallbackStore = () => {
  if (!fallbackStore) fallbackStore = createHotkeyStore()
  return fallbackStore
}

export const useHotkeyStore = (): HotkeyStore => {
  const contextStore = useHotkeyStoreContext()
  const env = useEnvironmentContext()
  const store = contextStore ?? getFallbackStore()

  useSafeLayoutEffect(() => {
    if (contextStore || fallbackInitialized) return
    fallbackInitialized = true
    store.init({ target: env.getRootNode() as Document })
  }, [contextStore, store, env])

  return store
}

import { type HotkeyStore, createHotkeyStore } from '@zag-js/hotkeys'
import { onMounted } from 'vue'
import { createContext } from '../../utils/create-context.ts'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../environment/use-environment-context.ts'

export const [HotkeyStoreContextProvider, useHotkeyStoreContext] = createContext<HotkeyStore>('HotkeyStoreContext')

let fallbackStore: HotkeyStore | undefined
let fallbackInitialized = false

const getFallbackStore = () => {
  if (!fallbackStore) fallbackStore = createHotkeyStore()
  return fallbackStore
}

export const useHotkeyStore = (): HotkeyStore => {
  const contextStore = useHotkeyStoreContext(undefined as unknown as HotkeyStore)
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const store = contextStore ?? getFallbackStore()

  onMounted(() => {
    if (contextStore || fallbackInitialized) return
    fallbackInitialized = true
    store.init({ target: env.value.getRootNode() as Document })
  })

  return store
}

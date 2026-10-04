import { type HotkeyStore, createHotkeyStore } from '@zag-js/hotkeys'
import { useEnvironmentContext } from '../environment/use-environment-context.ts'

export interface UseHotkeyStoreProps {
  /**
   * The store to read from and register on. Defaults to a store shared by every hook that
   * does not name one.
   *
   * Keep it stable: build it outside the component, since a store created during render is
   * rebuilt on every render and loses its registrations.
   */
  store?: HotkeyStore | undefined
}

let defaultHotkeyStore: HotkeyStore | undefined

const getDefaultHotkeyStore = () => {
  defaultHotkeyStore ??= createHotkeyStore()
  return defaultHotkeyStore
}

// Keyed by store so each one is initialized once, however many hooks reach for it.
const initialized = new WeakSet<HotkeyStore>()

export function useHotkeyStore(props: UseHotkeyStoreProps = {}): HotkeyStore {
  const env = useEnvironmentContext()
  const store = props.store ?? getDefaultHotkeyStore()

  $effect(() => {
    if (initialized.has(store)) return
    initialized.add(store)
    store.init({ target: env().getRootNode() as Document })
  })

  return store
}

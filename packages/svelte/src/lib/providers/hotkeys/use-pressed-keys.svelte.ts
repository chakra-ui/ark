import type { HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/svelte'
import { useHotkeyStore } from './use-hotkey-store.svelte.ts'

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

export function usePressedKeys(): () => string[] {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().pressedKeys),
  )
}

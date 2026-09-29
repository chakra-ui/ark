import type { HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/vue'
import type { Ref } from 'vue'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

export const usePressedKeys = (props: UseHotkeyStoreProps = {}): Readonly<Ref<string[]>> => {
  const store = useHotkeyStore(props)

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().pressedKeys),
  )
}

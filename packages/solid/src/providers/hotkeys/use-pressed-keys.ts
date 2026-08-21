import type { HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

export const usePressedKeys = (props: UseHotkeyStoreProps = {}): Accessor<string[]> => {
  const store = useHotkeyStore(props)

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().pressedKeys),
  )
}

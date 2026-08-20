import type { HotkeyCommand, HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { useHotkeyStore } from './use-hotkey-store.ts'

const getVersion = (state: HotkeyStoreState) =>
  Array.from(state.commands.values(), (command) => `${command.id}:${command.hotkey}:${command.label ?? ''}`).join('|')

export const useHotkeyRegistrations = (): Accessor<HotkeyCommand[]> => {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().commands.values()),
  )
}

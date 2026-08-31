import type { HotkeyCommand, HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/vue'
import type { Ref } from 'vue'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'

const getVersion = (state: HotkeyStoreState) =>
  Array.from(state.commands.values(), (command) => `${command.id}:${command.hotkey}:${command.label ?? ''}`).join('|')

export const useHotkeyRegistrations = (props: UseHotkeyStoreProps = {}): Readonly<Ref<HotkeyCommand[]>> => {
  const store = useHotkeyStore(props)

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().commands.values()),
  )
}

import type { HotkeyCommand, HotkeyStoreState } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/svelte'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.svelte.ts'

const getVersion = (state: HotkeyStoreState) =>
  Array.from(state.commands.values(), (command) => `${command.id}:${command.hotkey}:${command.label ?? ''}`).join('|')

export function useHotkeyRegistrations(props: UseHotkeyStoreProps = {}): () => HotkeyCommand[] {
  const store = useHotkeyStore(props)

  return useSyncExternalStore(
    (listener) => store.subscribe(getVersion, listener),
    () => Array.from(store.getState().commands.values()),
  )
}

import type { HotkeyStore } from '@zag-js/hotkeys'
import { useSyncExternalStore } from '@zag-js/vue'
import { type MaybeRef, type Ref, toValue } from 'vue'
import { useHotkeyStore } from './use-hotkey-store.ts'

// TODO(zag-bump): drop once @zag-js/hotkeys > 1.43.1 is released.
// `isPressed` parses a bare modifier as a regular key, so `isPressed('shift')` is always false.
const MODIFIER_ALIASES: Record<string, string> = {
  alt: 'Alt',
  cmd: 'Meta',
  command: 'Meta',
  control: 'Control',
  ctrl: 'Control',
  meta: 'Meta',
  option: 'Alt',
  shift: 'Shift',
}

const isPressed = (store: HotkeyStore, hotkey: string) => {
  const modifier = MODIFIER_ALIASES[hotkey.toLowerCase()]
  if (modifier) return store.getState().pressedKeys.has(modifier)
  return store.isPressed(hotkey)
}

export const useIsKeyPressed = (hotkey: MaybeRef<string>): Readonly<Ref<boolean>> => {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(() => isPressed(store, toValue(hotkey)), listener),
    () => isPressed(store, toValue(hotkey)),
  )
}

'use client'

import type { HotkeyStore } from '@zag-js/hotkeys'
import { useCallback, useSyncExternalStore } from 'react'
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

export const useIsKeyPressed = (hotkey: string): boolean => {
  const store = useHotkeyStore()

  const subscribe = useCallback(
    (onChange: () => void) => store.subscribe(() => isPressed(store, hotkey), onChange),
    [store, hotkey],
  )

  const getSnapshot = useCallback(() => isPressed(store, hotkey), [store, hotkey])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

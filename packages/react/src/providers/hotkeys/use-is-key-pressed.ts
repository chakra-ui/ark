'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { useHotkeyStore } from './use-hotkey-store.ts'

export const useIsKeyPressed = (hotkey: string): boolean => {
  const store = useHotkeyStore()

  const subscribe = useCallback(
    (onChange: () => void) => store.subscribe(() => store.isPressed(hotkey), onChange),
    [store, hotkey],
  )

  const getSnapshot = useCallback(() => store.isPressed(hotkey), [store, hotkey])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

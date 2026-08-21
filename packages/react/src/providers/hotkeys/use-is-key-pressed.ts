'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  /**
   * The key or combination to watch.
   */
  hotkey: string
}

export const useIsKeyPressed = (props: UseIsKeyPressedProps): boolean => {
  const { hotkey } = props
  const store = useHotkeyStore(props)

  const subscribe = useCallback(
    (onChange: () => void) => store.subscribe(() => store.isPressed(hotkey), onChange),
    [store, hotkey],
  )

  const getSnapshot = useCallback(() => store.isPressed(hotkey), [store, hotkey])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

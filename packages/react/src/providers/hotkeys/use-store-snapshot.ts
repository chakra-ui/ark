'use client'

import type { HotkeyStore, HotkeyStoreState } from '@zag-js/hotkeys'
import { useCallback, useRef, useSyncExternalStore } from 'react'

export function useStoreSnapshot<T>(
  store: HotkeyStore,
  getVersion: (state: HotkeyStoreState) => string,
  build: (state: HotkeyStoreState) => T,
): T {
  const cache = useRef<{ version: string; value: T } | null>(null)

  const subscribe = useCallback((onChange: () => void) => store.subscribe(getVersion, onChange), [store, getVersion])

  const getSnapshot = useCallback(() => {
    const state = store.getState()
    const version = getVersion(state)
    if (cache.current?.version !== version) {
      cache.current = { version, value: build(state) }
    }
    return cache.current.value
  }, [store, getVersion, build])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

'use client'

import type { HotkeyStoreState } from '@zag-js/hotkeys'
import { useHotkeyStore } from './use-hotkey-store.ts'
import { useStoreSnapshot } from './use-store-snapshot.ts'

const getVersion = (state: HotkeyStoreState) => Array.from(state.pressedKeys).join('|')

const build = (state: HotkeyStoreState): string[] => Array.from(state.pressedKeys)

export const usePressedKeys = (): string[] => {
  const store = useHotkeyStore()
  return useStoreSnapshot(store, getVersion, build)
}

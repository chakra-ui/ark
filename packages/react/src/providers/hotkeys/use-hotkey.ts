'use client'

import { type UseHotkeysCommand, type UseHotkeysProps, useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyProps extends UseHotkeysCommand, Pick<UseHotkeysProps, 'store'> {}

export const useHotkey = (props: UseHotkeyProps) => {
  const { store, ...command } = props

  // A fresh array each render is fine: `useHotkeys` reconciles field by field, so an
  // unchanged command is never re-registered.
  useHotkeys({ commands: [command], store })
}

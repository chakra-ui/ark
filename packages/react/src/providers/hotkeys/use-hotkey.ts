'use client'

import type { CommandDefinition, HotkeyAction } from '@zag-js/hotkeys'
import { useId, useMemo } from 'react'
import { useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyOptions extends Omit<CommandDefinition, 'id' | 'hotkey' | 'action'> {}

export const useHotkey = (hotkey: string, action: HotkeyAction, options: UseHotkeyOptions = {}) => {
  const id = useId()

  const { scopes, enabled, label, description, category, keywords, options: hotkeyOptions } = options

  const commands = useMemo(
    () => [{ id, hotkey, action, scopes, enabled, label, description, category, keywords, options: hotkeyOptions }],
    [id, hotkey, action, scopes, enabled, label, description, category, keywords, hotkeyOptions],
  )

  useHotkeys(commands)
}

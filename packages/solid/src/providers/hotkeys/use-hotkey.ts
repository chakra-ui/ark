import type { CommandDefinition, HotkeyAction } from '@zag-js/hotkeys'
import { createMemo, createUniqueId } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyOptions extends Omit<CommandDefinition, 'id' | 'hotkey' | 'action'> {}

export const useHotkey = (
  hotkey: MaybeAccessor<string>,
  action: HotkeyAction,
  options: MaybeAccessor<UseHotkeyOptions> = {},
) => {
  const id = createUniqueId()

  const commands = createMemo(() => [{ id, hotkey: runIfFn(hotkey), action, ...runIfFn(options) }])

  useHotkeys(commands)
}

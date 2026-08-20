import type { CommandDefinition, HotkeyAction } from '@zag-js/hotkeys'
import { type MaybeRef, computed, toValue, useId } from 'vue'
import { useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyOptions extends Omit<CommandDefinition, 'id' | 'hotkey' | 'action'> {}

export const useHotkey = (hotkey: MaybeRef<string>, action: HotkeyAction, options: MaybeRef<UseHotkeyOptions> = {}) => {
  const id = useId()

  const commands = computed(() => [{ id, hotkey: toValue(hotkey), action, ...toValue(options) }])

  useHotkeys(commands)
}

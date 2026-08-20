import type { CommandDefinition, HotkeyAction } from '@zag-js/hotkeys'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useHotkeys } from './use-hotkeys.svelte.ts'

export interface UseHotkeyOptions extends Omit<CommandDefinition, 'id' | 'hotkey' | 'action'> {}

// `$props.id()` is only callable from a component, and this runs from a plain module.
// The id is an internal registry key that is never rendered, so a counter is sufficient.
let count = 0
const nextId = () => `hotkey:${++count}`

export function useHotkey(
  hotkey: MaybeFunction<string>,
  action: HotkeyAction,
  options: MaybeFunction<UseHotkeyOptions> = {},
) {
  const id = nextId()

  useHotkeys(() => [{ id, hotkey: runIfFn(hotkey), action, ...runIfFn(options) }])
}

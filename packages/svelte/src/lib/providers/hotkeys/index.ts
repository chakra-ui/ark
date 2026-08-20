export { default as HotkeysProvider, type HotkeysProviderProps } from './hotkeys-provider.svelte'
export { useFormatHotkey, type UseFormatHotkeyReturn } from './use-format-hotkey.svelte.ts'
export { useHotkey, type UseHotkeyOptions } from './use-hotkey.svelte.ts'
export {
  useHotkeyRecorder,
  type UseHotkeyRecorderProps,
  type UseHotkeyRecorderReturn,
} from './use-hotkey-recorder.svelte.ts'
export { useHotkeyRegistrations } from './use-hotkey-registrations.svelte.ts'
export { useHotkeyStore } from './use-hotkey-store.svelte.ts'
export { useHotkeys, type UseHotkeysCommand } from './use-hotkeys.svelte.ts'
export { useIsKeyPressed } from './use-is-key-pressed.svelte.ts'
export { usePlatform, type Platform } from './use-platform.svelte.ts'
export { usePressedKeys } from './use-pressed-keys.svelte.ts'

export { formatHotkey, isHotKey, isHotkeyEqual, parseHotkey, validateHotkey } from '@zag-js/hotkeys'
export type {
  CommandDefinition,
  ConflictBehavior,
  HotkeyAction,
  HotkeyCommand,
  HotkeyFormatOptions,
  HotkeyOptions,
  HotkeyStore,
  HotkeyStoreOptions,
  ParsedHotkey,
  RecordedHotkey,
} from '@zag-js/hotkeys'

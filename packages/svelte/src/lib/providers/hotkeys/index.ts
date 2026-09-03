export { useFormatHotkey, type UseFormatHotkeyReturn } from './use-format-hotkey.svelte.ts'
export { useHotkey, type UseHotkeyProps } from './use-hotkey.svelte.ts'
export {
  useHotkeyRecorder,
  type UseHotkeyRecorderProps,
  type UseHotkeyRecorderReturn,
} from './use-hotkey-recorder.svelte.ts'
export { useHotkeyRegistrations } from './use-hotkey-registrations.svelte.ts'
export { useHotkeyStore, type UseHotkeyStoreProps } from './use-hotkey-store.svelte.ts'
export { useHotkeys, type UseHotkeysCommand, type UseHotkeysProps } from './use-hotkeys.svelte.ts'
export { useIsKeyPressed, type UseIsKeyPressedProps } from './use-is-key-pressed.svelte.ts'
export { usePlatform, type Platform } from './use-platform.svelte.ts'
export { usePressedKeys } from './use-pressed-keys.svelte.ts'

export { createHotkeyStore, formatHotkey, isHotKey, isHotkeyEqual, parseHotkey, validateHotkey } from '@zag-js/hotkeys'
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

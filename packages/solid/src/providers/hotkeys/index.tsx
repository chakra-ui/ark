export { useFormatHotkey, type UseFormatHotkeyReturn } from './use-format-hotkey.ts'
export { useHotkey, type UseHotkeyProps } from './use-hotkey.ts'
export { useHotkeyRecorder, type UseHotkeyRecorderProps, type UseHotkeyRecorderReturn } from './use-hotkey-recorder.ts'
export { useHotkeyRegistrations } from './use-hotkey-registrations.ts'
export { useHotkeyStore, type UseHotkeyStoreProps } from './use-hotkey-store.ts'
export { useHotkeys, type UseHotkeysCommand, type UseHotkeysProps } from './use-hotkeys.ts'
export { useIsKeyPressed, type UseIsKeyPressedProps } from './use-is-key-pressed.ts'
export { usePlatform, type Platform } from './use-platform.ts'
export { usePressedKeys } from './use-pressed-keys.ts'

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

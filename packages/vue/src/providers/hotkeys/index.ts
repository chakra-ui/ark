export { default as HotkeysProvider, type HotkeysProviderProps } from './hotkeys-provider.vue'
export { useFormatHotkey, type UseFormatHotkeyReturn } from './use-format-hotkey.ts'
export { useHotkey, type UseHotkeyOptions } from './use-hotkey.ts'
export { useHotkeyRecorder, type UseHotkeyRecorderProps, type UseHotkeyRecorderReturn } from './use-hotkey-recorder.ts'
export { useHotkeyRegistrations } from './use-hotkey-registrations.ts'
export { useHotkeyStore } from './use-hotkey-store.ts'
export { useHotkeys, type UseHotkeysCommand } from './use-hotkeys.ts'
export { useIsKeyPressed } from './use-is-key-pressed.ts'
export { usePlatform } from './use-platform.ts'
export { usePressedKeys } from './use-pressed-keys.ts'

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
  Platform,
  RecordedHotkey,
} from '@zag-js/hotkeys'

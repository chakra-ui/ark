import { type HotkeyFormatOptions, formatHotkey } from '@zag-js/hotkeys'
import { type ComputedRef, computed } from 'vue'
import { usePlatform } from './use-platform.ts'

export type UseFormatHotkeyReturn = ComputedRef<(hotkey: string, options?: HotkeyFormatOptions) => string>

export const useFormatHotkey = (): UseFormatHotkeyReturn => {
  const platform = usePlatform()

  return computed(
    () =>
      (hotkey: string, options: HotkeyFormatOptions = {}) =>
        formatHotkey(hotkey, { platform: platform.value, ...options }),
  )
}

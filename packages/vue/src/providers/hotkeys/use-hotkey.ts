import { type MaybeRef, computed, toValue } from 'vue'
import { type UseHotkeysCommand, type UseHotkeysProps, useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyProps extends UseHotkeysCommand, Pick<UseHotkeysProps, 'store'> {}

export const useHotkey = (props: MaybeRef<UseHotkeyProps>) => {
  const resolved = computed(() => {
    const { store, ...command } = toValue(props)
    return { commands: [command], store }
  })

  useHotkeys(resolved)
}

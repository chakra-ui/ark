import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { type UseHotkeysCommand, type UseHotkeysProps, useHotkeys } from './use-hotkeys.svelte.ts'

export interface UseHotkeyProps extends UseHotkeysCommand, Pick<UseHotkeysProps, 'store'> {}

export function useHotkey(props: MaybeFunction<UseHotkeyProps>) {
  useHotkeys(() => {
    const { store, ...command } = runIfFn(props)
    return { commands: [command], store }
  })
}

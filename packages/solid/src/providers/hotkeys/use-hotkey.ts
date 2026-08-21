import { createMemo } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { type UseHotkeysCommand, type UseHotkeysProps, useHotkeys } from './use-hotkeys.ts'

export interface UseHotkeyProps extends UseHotkeysCommand, Pick<UseHotkeysProps, 'store'> {}

export const useHotkey = (props: MaybeAccessor<UseHotkeyProps>) => {
  const resolved = createMemo(() => {
    const { store, ...command } = runIfFn(props)
    return { commands: [command], store }
  })

  useHotkeys(resolved)
}

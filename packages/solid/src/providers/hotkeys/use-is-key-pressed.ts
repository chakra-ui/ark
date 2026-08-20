import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { useHotkeyStore } from './use-hotkey-store.ts'

export const useIsKeyPressed = (hotkey: MaybeAccessor<string>): Accessor<boolean> => {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(runIfFn(hotkey)), listener),
    () => store.isPressed(runIfFn(hotkey)),
  )
}

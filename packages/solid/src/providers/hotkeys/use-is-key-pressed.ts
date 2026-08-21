import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import type { MaybeAccessor } from '../../types.ts'
import { runIfFn } from '../../utils/run-if-fn.ts'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.ts'

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  /**
   * The key or combination to watch.
   */
  hotkey: string
}

export const useIsKeyPressed = (props: MaybeAccessor<UseIsKeyPressedProps>): Accessor<boolean> => {
  const store = useHotkeyStore({ store: runIfFn(props).store })
  const hotkey = () => runIfFn(props).hotkey

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(hotkey()), listener),
    () => store.isPressed(hotkey()),
  )
}

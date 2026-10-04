import { useSyncExternalStore } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { type UseHotkeyStoreProps, useHotkeyStore } from './use-hotkey-store.svelte.ts'

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  /**
   * The key or combination to watch.
   */
  hotkey: string
}

export function useIsKeyPressed(props: MaybeFunction<UseIsKeyPressedProps>): () => boolean {
  const store = useHotkeyStore({ store: runIfFn(props).store })
  const hotkey = () => runIfFn(props).hotkey

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(hotkey()), listener),
    () => store.isPressed(hotkey()),
  )
}

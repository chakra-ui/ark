import { useSyncExternalStore } from '@zag-js/svelte'
import { type MaybeFunction, runIfFn } from '@zag-js/utils'
import { useHotkeyStore } from './use-hotkey-store.svelte.ts'

export function useIsKeyPressed(hotkey: MaybeFunction<string>): () => boolean {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(runIfFn(hotkey)), listener),
    () => store.isPressed(runIfFn(hotkey)),
  )
}

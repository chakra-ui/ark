import { useSyncExternalStore } from '@zag-js/vue'
import { type MaybeRef, type Ref, toValue } from 'vue'
import { useHotkeyStore } from './use-hotkey-store.ts'

export const useIsKeyPressed = (hotkey: MaybeRef<string>): Readonly<Ref<boolean>> => {
  const store = useHotkeyStore()

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(toValue(hotkey)), listener),
    () => store.isPressed(toValue(hotkey)),
  )
}

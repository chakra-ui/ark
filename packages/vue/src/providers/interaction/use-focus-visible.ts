import { isFocusVisible, trackFocusVisible } from '@zag-js/focus-visible'
import { useSyncExternalStore } from '@zag-js/vue'
import type { ShallowRef } from 'vue'
import { DEFAULT_ENVIRONMENT, useEnvironmentContext } from '../environment'

export interface UseFocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export function useFocusVisible(props: UseFocusVisibleProps = {}): Readonly<ShallowRef<boolean>> {
  const { isTextInput, autoFocus } = props
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)

  return useSyncExternalStore(
    (listener) =>
      trackFocusVisible({
        root: env.value.getRootNode(),
        isTextInput,
        autoFocus,
        onChange: listener,
      }),
    () => autoFocus || isFocusVisible(),
    () => false,
  )
}

import { isFocusVisible, trackFocusVisible } from '@zag-js/focus-visible'
import { useSyncExternalStore } from '@zag-js/solid'
import type { Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'

export interface UseFocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export function useFocusVisible(props: UseFocusVisibleProps = {}): Accessor<boolean> {
  const { isTextInput, autoFocus } = props
  const environment = useEnvironmentContext()

  return useSyncExternalStore(
    (listener) =>
      trackFocusVisible({
        root: environment().getRootNode(),
        isTextInput,
        autoFocus,
        onChange: listener,
      }),
    () => autoFocus || isFocusVisible(),
    () => false,
  )
}

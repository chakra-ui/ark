import type { Accessor } from '$lib/types'
import { isFocusVisible, trackFocusVisible } from '@zag-js/focus-visible'
import { useEnvironmentContext } from '../environment'

export interface UseFocusVisibleProps {
  isTextInput?: boolean
  autoFocus?: boolean
}

export function useFocusVisible(props: UseFocusVisibleProps = {}): Accessor<boolean> {
  const { isTextInput, autoFocus } = props
  const env = useEnvironmentContext()

  let focusVisible = $state(autoFocus || isFocusVisible())

  $effect(() => {
    return trackFocusVisible({
      root: env().getRootNode(),
      isTextInput,
      autoFocus,
      onChange(details) {
        focusVisible = details.isFocusVisible
      },
    })
  })

  return () => focusVisible
}

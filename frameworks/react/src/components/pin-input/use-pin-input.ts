import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironmentContext } from '~/providers/environment'
import type { Optional } from '~/types'
import { useEvent } from '~/utils/use-event'

export interface UsePinInputProps extends Optional<pinInput.Context, 'id'> {
  /**
   * The initial value of the pin input.
   */
  defaultValue?: pinInput.Context['value']
}

export interface UsePinInputReturn extends pinInput.Api<PropTypes> {}

export const usePinInput = (props: UsePinInputProps = {}): UsePinInputReturn => {
  const initialContext: pinInput.Context = {
    id: useId(),
    getRootNode: useEnvironmentContext(),
    ...props,
    value: props.defaultValue ?? [],
  }

  const context: pinInput.Context = {
    ...initialContext,
    value: props.value,
    onValueChange: useEvent(props.onValueChange, { sync: true }),
    onValueComplete: useEvent(props.onValueComplete),
    onValueInvalid: useEvent(props.onValueInvalid),
  }

  const [state, send] = useMachine(pinInput.machine(initialContext), { context })
  return pinInput.connect(state, send, normalizeProps)
}

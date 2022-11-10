import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import type { OptionalId } from '../types'

export type UsePinInputProps = OptionalId<pinInput.Context> & {
  defaultValue?: pinInput.Context['value']
}

export const usePinInput = (props: UsePinInputProps) => {
  const initialContext = {
    id: useId(),
    ...props,
    value: props.defaultValue ?? [],
  }

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(pinInput.machine(initialContext), { context })
  return pinInput.connect(state, send, normalizeProps)
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

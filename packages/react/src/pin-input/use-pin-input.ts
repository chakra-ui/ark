import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'
import { useEnvironment } from '../environment'
import type { Optional } from '../types'

export type UsePinInputProps = Optional<pinInput.Context, 'id'> & {
  defaultValue?: pinInput.Context['value']
}

export const usePinInput = (props: UsePinInputProps) => {
  const initialContext = useEnvironment({
    id: useId(),
    ...props,
    value: props.defaultValue ?? [],
  })

  const context = {
    ...initialContext,
    value: props.value,
  }

  const [state, send] = useMachine(pinInput.machine(initialContext), { context })
  return pinInput.connect(state, send, normalizeProps)
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

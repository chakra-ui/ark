import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/react'
import { useId } from 'react'

export type UsePinInputProps = Omit<pinInput.Context, 'id'>

export const usePinInput = (props: UsePinInputProps) => {
  const [state, send] = useMachine(
    pinInput.machine({
      id: useId(),
      ...props,
    }),
  )

  const api = pinInput.connect(state, send, normalizeProps)
  return { api }
}

export type UsePinInputReturn = ReturnType<typeof usePinInput>

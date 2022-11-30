import * as pinInput from '@zag-js/pin-input'
import { normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId, mergeProps } from 'solid-js'

export type UsePinInputProps = Omit<pinInput.Context, 'id'>
export type UsePinInputReturn = ReturnType<typeof usePinInput>

export const usePinInput = (props: UsePinInputProps) => {
  const context = mergeProps({ id: createUniqueId() }, props)
  const [state, send] = useMachine(pinInput.machine(context), { context })

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

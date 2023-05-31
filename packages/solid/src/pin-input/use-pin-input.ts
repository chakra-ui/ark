import * as pinInput from '@zag-js/pin-input'
import { mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export type UsePinInputProps = Optional<pinInput.Context, 'id'>
export type UsePinInputReturn = ReturnType<typeof usePinInput>

export const usePinInput = (props: UsePinInputProps) => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(pinInput.machine(context), { context })

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

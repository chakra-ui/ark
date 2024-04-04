import * as pinInput from '@zag-js/pin-input'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UsePinInputProps extends Optional<pinInput.Context, 'id'> {}
export interface UsePinInputReturn extends Accessor<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps): UsePinInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(pinInput.machine(context()), { context })

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

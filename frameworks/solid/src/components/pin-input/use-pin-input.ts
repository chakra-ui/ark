import * as pinInput from '@zag-js/pin-input'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '~/providers'
import type { Optional } from '~/types'

export interface UsePinInputProps extends Optional<pinInput.Context, 'id'> {}
export interface UsePinInputReturn extends Accessor<pinInput.Api<PropTypes>> {}

export const usePinInput = (props: UsePinInputProps): UsePinInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(pinInput.machine(context), { context })

  return createMemo(() => pinInput.connect(state, send, normalizeProps))
}

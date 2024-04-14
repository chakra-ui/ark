import * as numberInput from '@zag-js/number-input'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseNumberInputProps extends Optional<numberInput.Context, 'id'> {}
export interface UseNumberInputReturn extends Accessor<numberInput.Api<PropTypes>> {}

export const useNumberInput = (props: UseNumberInputProps): UseNumberInputReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(numberInput.machine(context), { context })

  return createMemo(() => numberInput.connect(state, send, normalizeProps))
}

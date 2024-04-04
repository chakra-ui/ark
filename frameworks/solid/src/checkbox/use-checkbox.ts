import * as checkbox from '@zag-js/checkbox'
import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseCheckboxProps extends Optional<checkbox.Context, 'id'> {}
export interface UseCheckboxReturn extends Accessor<checkbox.Api<PropTypes>> {}

export const useCheckbox = (props: UseCheckboxProps): UseCheckboxReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(checkbox.machine(context()), { context })

  return createMemo(() => checkbox.connect(state, send, normalizeProps))
}

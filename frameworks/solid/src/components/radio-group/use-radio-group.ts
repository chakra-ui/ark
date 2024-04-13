import * as radio from '@zag-js/radio-group'
import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '~/providers'
import type { Optional } from '~/types'

export interface UseRadioGroupProps extends Optional<radio.Context, 'id'> {}
export interface UseRadioGroupReturn extends Accessor<radio.Api<PropTypes>> {}

export const useRadioGroup = (props: UseRadioGroupProps): UseRadioGroupReturn => {
  const getRootNode = useEnvironmentContext()

  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)
  const [state, send] = useMachine(radio.machine(context), {
    context,
  })

  return createMemo(() => radio.connect(state, send, normalizeProps))
}

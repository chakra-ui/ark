import { mergeProps, normalizeProps, useMachine, type PropTypes } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { createMemo, createUniqueId, type Accessor } from 'solid-js'
import { useEnvironmentContext } from '../environment'
import { type Optional } from '../types'

export interface UseTooltipProps extends Optional<tooltip.Context, 'id'> {}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps): UseTooltipReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps({ id: createUniqueId(), getRootNode }, props)

  const [state, send] = useMachine(tooltip.machine(context), { context })
  return createMemo(() => tooltip.connect(state, send, normalizeProps))
}

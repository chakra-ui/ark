import { type PropTypes, mergeProps, normalizeProps, useMachine } from '@zag-js/solid'
import * as tooltip from '@zag-js/tooltip'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTooltipProps
  extends Optional<Omit<tooltip.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {}
export interface UseTooltipReturn extends Accessor<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps): UseTooltipReturn => {
  const getRootNode = useEnvironmentContext()
  const context = mergeProps(
    { id: createUniqueId(), getRootNode, 'open.controlled': props.open !== undefined },
    props,
  )

  const [state, send] = useMachine(tooltip.machine(context), { context })
  return createMemo(() => tooltip.connect(state, send, normalizeProps))
}

import * as tooltip from '@zag-js/tooltip'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { Optional } from '../../types'
import { useId } from '../../utils'

export interface UseTooltipProps extends Omit<Optional<tooltip.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the tooltip.
   */
  defaultOpen?: tooltip.Context['open']
}

export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps, emit: CallableFunction): UseTooltipReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    tooltip.machine({
      id: useId().value,
      getRootNode,
      ...context.value,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
    { context },
  )

  return computed(() => tooltip.connect(state.value, send, normalizeProps))
}

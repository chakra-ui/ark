import * as tooltip from '@zag-js/tooltip'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './tooltip.types'

export interface UseTooltipProps extends Omit<Optional<tooltip.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the tooltip.
   */
  defaultOpen?: tooltip.Context['open']
}

export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps, emit: EmitFn<RootEmits>): UseTooltipReturn => {
  const context = ref(props)
  const env = useEnvironmentContext()

  const [state, send] = useMachine(
    tooltip.machine({
      id: useId().value,
      getRootNode: env?.value.getRootNode,
      ...context.value,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('openChange', details)
      },
    }),
    { context },
  )

  return computed(() => tooltip.connect(state.value, send, normalizeProps))
}

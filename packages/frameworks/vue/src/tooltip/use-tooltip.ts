import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseTooltipProps extends Optional<tooltip.Context, 'id'> {}

export interface UseTooltipReturn extends ComputedRef<tooltip.Api<PropTypes>> {}

export const useTooltip = (props: UseTooltipProps, emit: CallableFunction): UseTooltipReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    tooltip.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onOpenChange: (details) => {
        emit('open-change', details)
      },
    }),
    { context },
  )

  return computed(() => tooltip.connect(state.value, send, normalizeProps))
}

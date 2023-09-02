import * as tooltip from '@zag-js/tooltip'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './tooltip.props'

export type UseTooltipProps = Optional<tooltip.Context, 'id'>
export type UseTooltipReturn = ComputedRef<tooltip.Api<PropTypes>>

export const useTooltip = (props: UseTooltipProps, emit: CallableFunction): UseTooltipReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    tooltip.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
    }),
  )

  return computed(() => tooltip.connect(state.value, send, normalizeProps))
}

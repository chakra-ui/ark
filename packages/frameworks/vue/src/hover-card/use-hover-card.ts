import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export interface UseHoverCardProps extends Optional<hoverCard.Context, 'id'> {
  modelValue?: hoverCard.Context['open']
}
export interface UseHoverCardReturn extends ComputedRef<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (
  props: UseHoverCardProps,
  emit: CallableFunction,
): UseHoverCardReturn => {
  const getRootNode = useEnvironmentContext()

  const context = ref(props)

  const [state, send] = useMachine(
    hoverCard.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      onOpenChange: (details) => {
        emit('open-change', details)
        emit('update:modelValue', details.open)
      },
    }),
    { context },
  )

  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

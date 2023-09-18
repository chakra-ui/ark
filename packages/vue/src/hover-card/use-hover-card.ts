import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { useId } from '../utils'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>
export type UseHoverCardReturn = ComputedRef<hoverCard.Api<PropTypes>>

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
      onOpenChange(details) {
        emit('open-change', details)
      },
    }),
    { context },
  )
  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

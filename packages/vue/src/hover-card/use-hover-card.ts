import * as hoverCard from '@zag-js/hover-card'
import { normalizeProps, useMachine, type PropTypes } from '@zag-js/vue'
import { computed, ref, type ComputedRef } from 'vue'
import { useEnvironmentContext } from '../environment'
import type { Optional } from '../types'
import { generateEventMap, useId } from '../utils'
import { emits } from './hover-card.props'

export type UseHoverCardProps = Optional<hoverCard.Context, 'id'>
export type UseHoverCardReturn = ComputedRef<hoverCard.Api<PropTypes>>

export const useHoverCard = (
  props: UseHoverCardProps,
  emit: CallableFunction,
): UseHoverCardReturn => {
  const getRootNode = useEnvironmentContext()
  const context = ref(props)
  const eventMap = generateEventMap(emits, emit)

  const [state, send] = useMachine(
    hoverCard.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      getRootNode,
      ...eventMap,
    }),
    { context },
  )
  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

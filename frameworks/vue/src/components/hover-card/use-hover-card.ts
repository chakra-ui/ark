import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './hover-card.types'

export interface UseHoverCardProps
  extends Optional<Omit<hoverCard.Context, 'dir' | 'getRootNode' | 'open.controlled'>, 'id'> {
  /**
   * The initial open state of the hover card when it is first rendered.
   * Use when you do not need to control its open state.
   */
  defaultOpen?: hoverCard.Context['open']
}
export interface UseHoverCardReturn extends ComputedRef<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (
  props: UseHoverCardProps,
  emit: EmitFn<RootEmits>,
): UseHoverCardReturn => {
  const context = ref(props)
  const env = useEnvironmentContext()

  const [state, send] = useMachine(
    hoverCard.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      open: props.open ?? props.defaultOpen,
      'open.controlled': props.open !== undefined,
      getRootNode: env?.value.getRootNode,
      onOpenChange: (details) => {
        emit('openChange', details)
        emit('update:open', details.open)
      },
    }),
    { context },
  )

  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

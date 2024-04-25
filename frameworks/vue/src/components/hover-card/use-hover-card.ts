import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, ref } from 'vue'
import { useEnvironmentContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { useId } from '../../utils'
import type { RootEmits } from './hover-card.types'

export interface UseHoverCardProps
  extends Omit<Optional<hoverCard.Context, 'id'>, 'open.controlled'> {
  /**
   * The initial open state of the hover card.
   */
  defaultOpen?: hoverCard.Context['open']
  'onUpdate:open'?: (open: hoverCard.OpenChangeDetails['open']) => void
}
export interface UseHoverCardReturn extends ComputedRef<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (
  props: UseHoverCardProps,
  emit: EmitFn<RootEmits>,
): UseHoverCardReturn => {
  const context = ref(props)
  const getRootNode = useEnvironmentContext()

  const [state, send] = useMachine(
    hoverCard.machine({
      ...context.value,
      id: context.value.id ?? useId().value,
      open: props.open ?? props.defaultOpen,
      getRootNode,
      'open.controlled': props.open !== undefined,
      onOpenChange: (details) => {
        emit('openChange', details)
        emit('update:open', details.open)
      },
    }),
    { context },
  )

  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps, useId } from '../../utils'
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
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const context = computed<hoverCard.Context>(() => ({
    id,
    dir: locale.value.dir,
    open: props.open ?? props.defaultOpen,
    'open.controlled': props.open !== undefined,
    getRootNode: env?.value.getRootNode,
    onOpenChange: (details) => {
      emit('openChange', details)
      emit('update:open', details.open)
    },
    ...cleanProps(props),
  }))

  const [state, send] = useMachine(hoverCard.machine(context.value), { context })

  return computed(() => hoverCard.connect(state.value, send, normalizeProps))
}

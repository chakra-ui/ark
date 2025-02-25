import * as hoverCard from '@zag-js/hover-card'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import type { RootEmits } from './hover-card.types'

export interface UseHoverCardProps extends Optional<Omit<hoverCard.Props, 'dir' | 'getRootNode' | 'open'>, 'id'> {
  /**
   * The v-model open state of the hover card
   */
  modelValue?: hoverCard.Props['open']
}
export interface UseHoverCardReturn extends ComputedRef<hoverCard.Api<PropTypes>> {}

export const useHoverCard = (props: UseHoverCardProps = {}, emit?: EmitFn<RootEmits>): UseHoverCardReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)

  const context = computed<hoverCard.Props>(() => ({
    id,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    open: props.modelValue,
    onOpenChange: (details) => {
      emit?.('openChange', details)
      emit?.('update:open', details.open) // TODO: remove this
      emit?.('update:modelValue', details.open)
    },
    ...cleanProps(props),
  }))

  const service = useMachine(hoverCard.machine, context)
  return computed(() => hoverCard.connect(service, normalizeProps))
}

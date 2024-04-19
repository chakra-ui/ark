import type { ItemProps } from '@zag-js/accordion'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'

export interface AccordionItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const AccordionItem = defineComponent<AccordionItemProps>(
  (props, { slots, attrs, emit }) => {
    const api = useAccordionContext()
    const itemState = computed(() => api.value.getItemState(props))

    const renderStrategyProps = useRenderStrategyContext()
    const usePresenceProps = computed(() => ({
      ...renderStrategyProps.value,
      present: itemState.value.isOpen,
    }))
    const presenceApi = usePresence(usePresenceProps, emit)

    AccordionItemProvider(computed(() => props))
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(itemState.value)}
      </ark.div>
    )
  },
  {
    name: 'AccordionItem',
    props: {
      value: {
        type: String as PropType<ItemProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<ItemProps['disabled']>,
        default: undefined,
      },
    },
    emits,
  },
)

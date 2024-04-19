import type { ItemProps } from '@zag-js/accordion'
import { type PropType, computed, defineComponent, ref } from 'vue'
import type { Assign } from '../../types'
import { useRenderStrategyContext } from '../../utils/render-strategy'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './use-accordion-context'
import { AccordionItemProvider } from './use-accordion-item-context'
import { AccordionItemPropsProvider } from './use-accordion-item-props-context'

export interface AccordionItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const AccordionItem = defineComponent<AccordionItemProps>(
  (props, { slots, attrs, emit }) => {
    const accordion = useAccordionContext()
    const itemState = computed(() => accordion.value.getItemState(props))

    const renderStrategyProps = useRenderStrategyContext()
    const usePresenceProps = computed(() => ({
      ...renderStrategyProps.value,
      present: itemState.value.isOpen,
    }))
    const presenceApi = usePresence(usePresenceProps, emit)

    AccordionItemProvider(itemState)
    AccordionItemPropsProvider(ref(props))
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...accordion.value.getItemProps(props)} {...attrs}>
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

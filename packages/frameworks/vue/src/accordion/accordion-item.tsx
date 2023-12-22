import type { ItemProps } from '@zag-js/accordion'
import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, usePresencePropsContext } from '../presence'
import { emits } from '../presence/presence.props'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider } from './accordion-item-context'

export interface AccordionItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const AccordionItem = defineComponent({
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
  setup(props, { slots, attrs, emit }) {
    const api = useAccordionContext()
    const itemState = computed(() => api.value.getItemState(props))

    const presenceProps = usePresencePropsContext()
    const usePresenceProps = computed(() => ({
      ...presenceProps.value,
      present: itemState.value.isOpen,
    }))
    // TODO: there should be a better way
    const presenceApi = usePresence(usePresenceProps as any, emit)

    AccordionItemProvider(computed(() => props))
    PresenceProvider(presenceApi)

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(itemState.value)}
      </ark.div>
    )
  },
})

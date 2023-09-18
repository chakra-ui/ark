import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useAccordionContext } from './accordion-context'
import { AccordionItemProvider, type AccordionItemContext } from './accordion-item-context'

export type AccordionItemProps = Assign<AccordionItemContext, HTMLArkProps<'div'>>

export const AccordionItem = defineComponent({
  name: 'AccordionItem',
  props: {
    value: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useAccordionContext()
    AccordionItemProvider(computed(() => ({ ...props, ...api.value.getItemState(props) })))
    const itemState = computed(() => api.value.getItemState(props))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots?.default?.(itemState)}
      </ark.div>
    )
  },
})

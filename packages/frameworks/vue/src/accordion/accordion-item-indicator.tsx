import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = defineComponent({
  name: 'AccordionItemIndicator',
  setup(_, { attrs, slots }) {
    const api = useAccordionContext()
    const item = useAccordionItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(item.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})

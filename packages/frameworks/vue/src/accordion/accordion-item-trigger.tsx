import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionItemTriggerProps = HTMLArkProps<'button'>

export const AccordionItemTrigger = defineComponent({
  name: 'AccordionItemTrigger',
  setup(_, { attrs, slots }) {
    const api = useAccordionContext()
    const item = useAccordionItemContext()

    return () => (
      <ark.button {...api.value.getItemTriggerProps(item.value)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

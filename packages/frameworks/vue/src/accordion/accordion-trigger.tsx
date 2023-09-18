import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionTriggerProps = HTMLArkProps<'button'>

export const AccordionTrigger = defineComponent({
  name: 'AccordionTrigger',
  setup(_, { attrs, slots }) {
    const api = useAccordionContext()
    const item = useAccordionItemContext()

    return () => (
      <ark.button {...api.value.getTriggerProps(item.value)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})

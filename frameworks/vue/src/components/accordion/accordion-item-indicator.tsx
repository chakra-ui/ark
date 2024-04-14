import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = defineComponent<AccordionItemIndicatorProps>(
  (_, { attrs, slots }) => {
    const api = useAccordionContext()
    const item = useAccordionItemContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(item.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'AccordionItemIndicator',
  },
)

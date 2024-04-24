import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemIndicatorProps extends HTMLArkProps<'div'> {}

export const AccordionItemIndicator = defineComponent<AccordionItemIndicatorProps>(
  (_, { attrs, slots }) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()

    return () => (
      <ark.div {...accordion.value.getItemIndicatorProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'AccordionItemIndicator',
  },
)

import { defineComponent } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export type AccordionContentProps = HTMLArkProps<'div'>

export const AccordionContent = defineComponent<AccordionContentProps>({
  setup(_, { slots, attrs }) {
    const api = useAccordionContext()
    const { value } = useAccordionItemContext()

    return () => (
      <ark.div {...api.value.getContentProps({ value })} {...attrs}>
        {slots?.default?.()}
      </ark.div>
    )
  },
})

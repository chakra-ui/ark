import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = defineComponent<AccordionItemContentProps>(
  (_, { slots, attrs }) => {
    const api = useAccordionContext()
    const item = useAccordionItemContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.getItemContentProps(item.value)} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'AccordionItemContent',
    emits,
  },
)

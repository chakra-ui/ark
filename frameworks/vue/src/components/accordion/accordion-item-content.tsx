import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = defineComponent<AccordionItemContentProps>(
  (_, { slots, attrs }) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...accordion.value.getItemContentProps(itemProps)} {...attrs}>
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

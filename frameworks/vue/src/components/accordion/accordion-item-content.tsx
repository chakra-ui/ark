import { computed, defineComponent } from 'vue'
import { Collapsible } from '../..'
import type { HTMLArkProps } from '../factory'
import { emits } from '../presence/presence.props'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemContentProps extends HTMLArkProps<'div'> {}

export const AccordionItemContent = defineComponent<AccordionItemContentProps>(
  (_, { slots, attrs }) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const contentProps = computed(() => {
      const { hidden: _, ...itemContentProps } = accordion.value.getItemContentProps(itemProps)
      return itemContentProps
    })

    return () => (
      <Collapsible.Content {...contentProps.value} {...attrs}>
        {slots.default?.()}
      </Collapsible.Content>
    )
  },
  {
    name: 'AccordionItemContent',
    emits,
  },
)

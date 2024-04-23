import { computed, defineComponent } from 'vue'
import { useCollapsibleContext } from '../collapsible'
import { type HTMLArkProps, ark } from '../factory'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = defineComponent<AccordionItemTriggerProps>(
  (_, { attrs, slots }) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const collapsible = useCollapsibleContext()
    const triggerProps = computed(() => accordion.value.getItemTriggerProps(itemProps))

    const ariaProps = computed(() => ({
      'aria-controls': collapsible.value.unmounted
        ? undefined
        : triggerProps.value['aria-controls'],
    }))

    return () => (
      <ark.button {...triggerProps.value} {...ariaProps.value} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'AccordionItemTrigger',
  },
)

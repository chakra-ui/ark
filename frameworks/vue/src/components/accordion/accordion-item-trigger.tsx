import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './use-accordion-context'
import { useAccordionItemPropsContext } from './use-accordion-item-props-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = defineComponent<AccordionItemTriggerProps>(
  (_, { attrs, slots }) => {
    const accordion = useAccordionContext()
    const itemProps = useAccordionItemPropsContext()
    const presenceApi = usePresenceContext()
    const triggerProps = computed(() => accordion.value.getItemTriggerProps(itemProps.value))

    const ariaProps = computed(() => ({
      'aria-controls': presenceApi.value.isUnmounted
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

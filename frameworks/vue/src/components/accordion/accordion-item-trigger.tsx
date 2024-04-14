import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { usePresenceContext } from '../presence'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

export interface AccordionItemTriggerProps extends HTMLArkProps<'button'> {}

export const AccordionItemTrigger = defineComponent<AccordionItemTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useAccordionContext()
    const item = useAccordionItemContext()
    const presenceApi = usePresenceContext()
    const triggerProps = computed(() => api.value.getItemTriggerProps(item.value))

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

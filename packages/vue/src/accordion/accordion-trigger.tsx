import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useAccordionContext } from './accordion-context'
import { useAccordionItemContext } from './accordion-item-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type AccordionTriggerProps = Record<string, unknown>

export const AccordionTrigger = defineComponent<AccordionTriggerProps>({
  name: 'AccordionTrigger',
  setup(_, { slots, attrs }) {
    const api = useAccordionContext()
    const { value, disabled } = useAccordionItemContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'AccordionTrigger')

      return h(DefaultSlot, { ...api.value.getTriggerProps({ value, disabled }), ...attrs })
    }
  },
})

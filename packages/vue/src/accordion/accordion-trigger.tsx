import { cloneVNode, defineComponent, h } from 'vue'
import { getValidChildren } from '../utils'
import { useAccordionContext } from './accordion'
import { useAccordionItemContext } from './accordion-item'

export const AccordionTrigger = defineComponent({
  setup(_, { slots, attrs }) {
    const api = useAccordionContext()
    const { value, disabled } = useAccordionItemContext()

    return () => {
      const validChildren = getValidChildren(slots)
      if (validChildren.length > 1) {
        const errorMessage =
          '[AccordionTrigger] : Accordion Trigger can only have one root element.'
        console.error(errorMessage)
        throw new SyntaxError(errorMessage)
      }
      const DefaultSlot = cloneVNode(validChildren[0])

      return h(DefaultSlot, { ...api.value.getTriggerProps({ value, disabled }), ...attrs })
    }
  },
})

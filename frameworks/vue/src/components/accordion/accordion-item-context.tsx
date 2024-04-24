import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseAccordionItemContext, useAccordionItemContext } from './use-accordion-item-context'

export type AccordionItemContextProps = SlotsType<{
  default: UnwrapRef<UseAccordionItemContext>
}>

export const AccordionItemContext = defineComponent(
  (_, { slots }) => {
    const item = useAccordionItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'AccordionItemContext',
    slots: Object as AccordionItemContextProps,
  },
)

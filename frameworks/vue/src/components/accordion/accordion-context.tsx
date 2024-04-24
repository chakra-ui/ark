import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseAccordionContext, useAccordionContext } from './use-accordion-context'

export type AccordionContextProps = SlotsType<{
  default: UnwrapRef<UseAccordionContext>
}>

export const AccordionContext = defineComponent(
  (_, { slots }) => {
    const accordion = useAccordionContext()

    return () => slots.default(accordion.value)
  },
  {
    name: 'AccordionContext',
    slots: Object as AccordionContextProps,
  },
)

import { Accordion as AccordionRoot, type AccordionProps } from './accordion'
import { AccordionContent, type AccordionContentProps } from './accordion-content'
import { useAccordionContext } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { useAccordionItemContext } from './accordion-item-context'
import { AccordionTrigger, type AccordionTriggerProps } from './accordion-trigger'
import { accordionAnatomy } from './accordion.anatomy'

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Content: AccordionContent,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
})

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionAnatomy,
  useAccordionContext,
  useAccordionItemContext,
}
export type { AccordionContentProps, AccordionItemProps, AccordionProps, AccordionTriggerProps }

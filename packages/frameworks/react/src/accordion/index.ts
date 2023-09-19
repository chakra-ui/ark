import { Accordion as AccordionRoot, type AccordionProps } from './accordion'
import { AccordionContent, type AccordionContentProps } from './accordion-content'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { useAccordionItemContext, type AccordionItemContext } from './accordion-item-context'
import { AccordionTrigger, type AccordionTriggerProps } from './accordion-trigger'

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
  useAccordionContext,
  useAccordionItemContext,
}
export type {
  AccordionContentProps,
  AccordionContext,
  AccordionItemContext,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
}

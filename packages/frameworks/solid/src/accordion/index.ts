import { Accordion as AccordionRoot, type AccordionProps } from './accordion'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { AccordionItemContent, type AccordionItemContentProps } from './accordion-item-content'
import { useAccordionItemContext, type AccordionItemContext } from './accordion-item-context'
import { AccordionItemTrigger, type AccordionItemTriggerProps } from './accordion-item-trigger'

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemContent: AccordionItemContent,
  ItemTrigger: AccordionItemTrigger,
})

export {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  useAccordionContext,
  useAccordionItemContext,
}
export type {
  AccordionContext,
  AccordionItemContentProps,
  AccordionItemContext,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionProps,
}

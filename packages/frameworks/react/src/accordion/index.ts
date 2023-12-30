import { Accordion as AccordionRoot, type AccordionProps } from './accordion'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionDebug, type AccordionDebugProps } from './accordion-debug'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { AccordionItemContent, type AccordionItemContentProps } from './accordion-item-content'
import { useAccordionItemContext, type AccordionItemContext } from './accordion-item-context'
import {
  AccordionItemIndicator,
  type AccordionItemIndicatorProps,
} from './accordion-item-indicator'
import { AccordionItemTrigger, type AccordionItemTriggerProps } from './accordion-item-trigger'

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Debug: AccordionDebug,
  Item: AccordionItem,
  ItemContent: AccordionItemContent,
  ItemIndicator: AccordionItemIndicator,
  ItemTrigger: AccordionItemTrigger,
})

export {
  Accordion,
  AccordionDebug,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  useAccordionContext,
  useAccordionItemContext,
}
export type {
  AccordionContext,
  AccordionDebugProps,
  AccordionItemContentProps,
  AccordionItemContext,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionProps,
}

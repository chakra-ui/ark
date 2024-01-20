import { Accordion as AccordionRoot, type AccordionProps } from './accordion'
import { useAccordionContext, type AccordionContext } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { AccordionItemContent, type AccordionItemContentProps } from './accordion-item-content'
import { useAccordionItemContext, type AccordionItemContext } from './accordion-item-context'
import {
  AccordionItemIndicator,
  type AccordionItemIndicatorProps,
} from './accordion-item-indicator'
import { AccordionItemTrigger, type AccordionItemTriggerProps } from './accordion-item-trigger'
import type { AccordionRootProps } from './accordion.props'

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemContent: AccordionItemContent,
  ItemIndicator: AccordionItemIndicator,
  ItemTrigger: AccordionItemTrigger,
})

export {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  useAccordionContext,
  useAccordionItemContext,
}
export type {
  AccordionContext,
  AccordionItemContentProps,
  AccordionItemContext,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionProps,
  AccordionRootProps,
}

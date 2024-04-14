import type {
  FocusChangeDetails as AccordionFocusChangeDetails,
  ValueChangeDetails as AccordionValueChangeDetails,
} from '@zag-js/accordion'
import { type AccordionContext, useAccordionContext } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { AccordionItemContent, type AccordionItemContentProps } from './accordion-item-content'
import { type AccordionItemContext, useAccordionItemContext } from './accordion-item-context'
import {
  AccordionItemIndicator,
  type AccordionItemIndicatorProps,
} from './accordion-item-indicator'
import { AccordionItemTrigger, type AccordionItemTriggerProps } from './accordion-item-trigger'
import { AccordionRoot, type AccordionRootProps } from './accordion-root'

export * as Accordion from './accordion'

export {
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  useAccordionContext,
  useAccordionItemContext,
}

export type {
  AccordionContext,
  AccordionFocusChangeDetails,
  AccordionItemContentProps,
  AccordionItemContext,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootProps,
  AccordionValueChangeDetails,
}

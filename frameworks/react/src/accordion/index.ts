import type {
  FocusChangeDetails as AccordionFocusChangeDetails,
  ValueChangeDetails as AccordionValueChangeDetails,
} from '@zag-js/accordion'
import { AccordionContext, type AccordionContextProps } from './accordion-context'
import { AccordionItem, type AccordionItemProps } from './accordion-item'
import { AccordionItemContent, type AccordionItemContentProps } from './accordion-item-content'
import {
  AccordionItemIndicator,
  type AccordionItemIndicatorProps,
} from './accordion-item-indicator'
import { AccordionItemTrigger, type AccordionItemTriggerProps } from './accordion-item-trigger'
import { AccordionRoot, type AccordionRootProps } from './accordion-root'
import { useAccordionContext, type UseAccordionContext } from './use-accordion-context'
import { useAccordionItemContext, type UseAccordionItemContext } from './use-accordion-item-context'

export * as Accordion from './accordion'

export {
  AccordionContext,
  AccordionItem,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRoot,
  useAccordionContext,
  useAccordionItemContext,
}

export type {
  AccordionContextProps,
  AccordionFocusChangeDetails,
  AccordionItemContentProps,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootProps,
  AccordionValueChangeDetails,
  UseAccordionContext,
  UseAccordionItemContext,
}

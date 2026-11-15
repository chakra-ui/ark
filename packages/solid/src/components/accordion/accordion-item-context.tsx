import type { JSX } from '@solidjs/web'
import { type UseAccordionItemContext, useAccordionItemContext } from './use-accordion-item-context.ts'

export interface AccordionItemContextProps {
  children: (context: UseAccordionItemContext) => JSX.Element
}

export const AccordionItemContext = (props: AccordionItemContextProps) => props.children(useAccordionItemContext())

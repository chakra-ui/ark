import type { ReactNode } from 'react'
import { type UseAccordionItemContext, useAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemContextProps {
  children: (context: UseAccordionItemContext) => ReactNode
}

export const AccordionItemContext = (props: AccordionItemContextProps) => props.children(useAccordionItemContext())

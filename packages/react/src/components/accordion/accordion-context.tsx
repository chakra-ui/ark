import type { ReactNode } from 'react'
import { type UseAccordionContext, useAccordionContext } from './use-accordion-context'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => ReactNode
}

export const AccordionContext = (props: AccordionContextProps) => props.children(useAccordionContext())

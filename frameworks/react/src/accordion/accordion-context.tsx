import type { ReactNode } from 'react'
import { useAccordionContext, type UseAccordionContext } from './use-accordion-context'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => ReactNode
}

export const AccordionContext = (props: AccordionContextProps) =>
  props.children(useAccordionContext())

import type { JSX } from '@solidjs/web'
import { type UseAccordionContext, useAccordionContext } from './use-accordion-context.ts'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => JSX.Element
}

export const AccordionContext = (props: AccordionContextProps) => props.children(useAccordionContext())

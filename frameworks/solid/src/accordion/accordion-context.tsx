import type { JSX } from 'solid-js'
import { useAccordionContext, type UseAccordionContext } from './use-accordion-context'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => JSX.Element
}

export const AccordionContext = (props: AccordionContextProps) =>
  props.children(useAccordionContext())

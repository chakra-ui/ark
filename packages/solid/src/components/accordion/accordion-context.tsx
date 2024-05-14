import type { JSX } from 'solid-js'
import { type UseAccordionContext, useAccordionContext } from './use-accordion-context'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => JSX.Element
}

export const AccordionContext = (props: AccordionContextProps) =>
  props.children(useAccordionContext())

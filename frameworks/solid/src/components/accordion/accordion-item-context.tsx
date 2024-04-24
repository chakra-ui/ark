import type { JSX } from 'solid-js'
import { type UseAccordionItemContext, useAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemContextProps {
  children: (context: UseAccordionItemContext) => JSX.Element
}

export const AccordionItemContext = (props: AccordionItemContextProps) =>
  props.children(useAccordionItemContext())

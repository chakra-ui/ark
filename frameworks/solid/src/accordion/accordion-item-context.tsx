import type { JSX } from 'solid-js'
import { useAccordionItemContext, type UseAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemContextProps {
  children: (context: UseAccordionItemContext) => JSX.Element
}

export const AccordionItemContext = (props: AccordionItemContextProps) =>
  props.children(useAccordionItemContext())

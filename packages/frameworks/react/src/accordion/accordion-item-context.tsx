import { useAccordionItemContext, type UseAccordionItemContext } from './use-accordion-item-context'

export interface AccordionItemContextProps {
  children: (context: Omit<UseAccordionItemContext, 'disabled'>) => React.ReactNode
}

export const AccordionItemContext = (props: AccordionItemContextProps) =>
  props.children(useAccordionItemContext())

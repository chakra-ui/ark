import { useAccordionContext, type UseAccordionContext } from './use-accordion-context'

export interface AccordionContextProps {
  children: (context: UseAccordionContext) => React.ReactNode
}

export const AccordionContext = (props: AccordionContextProps) =>
  props.children(useAccordionContext())

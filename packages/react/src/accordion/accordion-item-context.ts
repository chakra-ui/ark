import { createContext } from '../create-context'
import type { AccordionContext } from './accordion-context'

export type AccordionItemContext = ReturnType<AccordionContext['getItemState']> & {
  value: string
  disabled?: boolean
}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

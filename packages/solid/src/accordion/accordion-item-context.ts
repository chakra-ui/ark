import { createContext } from '../create-context'

export type AccordionItemContext = { value: string; disabled?: boolean }

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

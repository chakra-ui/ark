import type { ItemProps } from '@zag-js/accordion'
import { createContext } from '../create-context'

export interface AccordionItemContext extends ItemProps {}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

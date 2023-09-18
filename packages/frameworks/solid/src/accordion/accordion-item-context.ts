import type { ItemProps, ItemState } from '@zag-js/accordion'
import { createContext } from '../create-context'

export type AccordionItemContext = ItemProps & ItemState

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

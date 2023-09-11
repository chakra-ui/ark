import type { ItemProps, ItemState } from '@zag-js/accordion'
import { createContext } from '../create-context'

export interface AccordionItemContext extends ItemProps, ItemState {}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

import { createContext } from '../createContext'
import type { connect } from '@zag-js/accordion'

export type AccordionItemContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

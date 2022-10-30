import type { connect } from '@zag-js/accordion'
import { createContext } from '../createContext'

export type AccordionItemContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

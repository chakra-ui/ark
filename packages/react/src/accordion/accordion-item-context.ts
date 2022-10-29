import { createContext } from '../createContext'
import { connect } from '@zag-js/accordion'

export type AccordionItemContext = Parameters<ReturnType<typeof connect>['getItemProps']>[0]

export const [AccordionItemProvider, useAccordionItemContext] = createContext<AccordionItemContext>(
  {
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  },
)

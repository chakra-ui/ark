import { createContext } from '../createContext'
import { UseAccordionReturn } from './use-accordion'

export type AccordionContext = Omit<UseAccordionReturn, 'htmlProps'>

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

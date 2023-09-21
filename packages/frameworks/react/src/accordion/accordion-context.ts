import { createContext } from '../create-context'
import { type UseAccordionReturn } from './use-accordion'

export interface AccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

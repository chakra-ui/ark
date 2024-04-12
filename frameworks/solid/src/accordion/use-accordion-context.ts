import { createContext } from '../create-context'
import type { UseAccordionReturn } from './use-accordion'

export interface UseAccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] = createContext<UseAccordionContext>({
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

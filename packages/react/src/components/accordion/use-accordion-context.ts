import { createContext } from '../../utils/create-context'
import type { UseAccordionReturn } from './use-accordion'

export interface UseAccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] = createContext<UseAccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

import { createContext } from '../../utils/create-context.ts'
import type { UseAccordionReturn } from './use-accordion.ts'

export interface UseAccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] = createContext<UseAccordionContext>({
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

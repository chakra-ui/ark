import { createContext } from '../create-context'
import { type UseAccordionReturn } from './use-accordion'

export type AccordionContext = UseAccordionReturn

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

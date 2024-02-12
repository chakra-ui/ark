import { createContext } from '../create-context'
import type { UsePresenceProps } from '../presence'
import { type UseAccordionReturn } from './use-accordion'

export interface AccordionContext extends UseAccordionReturn, UsePresenceProps {}

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  name: 'AccordionContext',
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

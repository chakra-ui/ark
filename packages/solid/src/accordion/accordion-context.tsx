import { createContext, useContext } from 'solid-js'
import { UseAccordionReturn } from './use-accordion'

export const AccordionContext = createContext<UseAccordionReturn>()

export function useAccordionContext() {
  return useContext(AccordionContext)
}

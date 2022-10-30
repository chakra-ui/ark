/** @jsxImportSource solid-js */
import { UseAccordionReturn } from './use-accordion'
import { createContext } from '../createContext'

export type AccordionContext = UseAccordionReturn

export const [AccordionProvider, useAccordionContext] = createContext<AccordionContext>({
  hookName: 'useAccordionContext',
  providerName: '<AccordionProvider />',
})

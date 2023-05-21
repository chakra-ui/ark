import { createContext } from '../context'
import type { UseAccordionReturn } from './use-accordion'

export type AccordionContext = UseAccordionReturn

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContext>('AccordionContext')

import { createContext } from '../context'
import type { UseAccordionReturn } from './use-accordion'

export interface AccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContext>('AccordionContext')

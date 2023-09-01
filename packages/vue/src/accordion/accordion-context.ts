import { createContext } from '../context'
import type { UseAccordionReturn } from './use-accordion'

export const [AccordionProvider, useAccordionContext] =
  createContext<UseAccordionReturn>('AccordionContext')

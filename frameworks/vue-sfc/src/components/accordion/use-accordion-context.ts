import { createContext } from '../../utils'
import type { UseAccordionReturn } from './use-accordion'

export interface UseAccordionContext extends UseAccordionReturn {}

export const [AccordionProvider, useAccordionContext] =
  createContext<UseAccordionContext>('AccordionContext')

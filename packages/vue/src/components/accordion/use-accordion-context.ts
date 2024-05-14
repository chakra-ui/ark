import { createContext } from '../../utils'
import type { UsePresenceProps } from '../presence'
import type { UseAccordionReturn } from './use-accordion'

export interface UseAccordionContext extends UseAccordionReturn, UsePresenceProps {}

export const [AccordionProvider, useAccordionContext] =
  createContext<UseAccordionContext>('AccordionContext')

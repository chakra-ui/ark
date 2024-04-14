import { createContext } from '../../utils/context'
import type { UsePresenceProps } from '../presence'
import type { UseAccordionReturn } from './use-accordion'

export interface AccordionContext extends UseAccordionReturn, UsePresenceProps {}

export const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContext>('AccordionContext')

import { createContext } from '../../utils/create-context.ts'
import type { UsePresenceProps } from '../presence/index.ts'
import type { UseAccordionReturn } from './use-accordion.ts'

export interface UseAccordionContext extends UseAccordionReturn, UsePresenceProps {}

export const [AccordionProvider, useAccordionContext] = createContext<UseAccordionContext>('AccordionContext')

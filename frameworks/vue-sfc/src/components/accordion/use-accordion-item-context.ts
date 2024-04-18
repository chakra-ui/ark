import type { ItemState } from '@zag-js/accordion'
import { createContext } from '../../utils'

export interface UseAccordionItemContext extends ItemState {}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<UseAccordionItemContext>('AccordionItemContext')

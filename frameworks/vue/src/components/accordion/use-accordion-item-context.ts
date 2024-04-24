import type { ItemState } from '@zag-js/accordion'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseAccordionItemContext extends ComputedRef<ItemState> {}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<UseAccordionItemContext>('AccordionItemContext')

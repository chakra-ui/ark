import type { ItemProps } from '@zag-js/accordion'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseAccordionItemContext extends ComputedRef<ItemProps> {}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<UseAccordionItemContext>('AccordionItemContext')

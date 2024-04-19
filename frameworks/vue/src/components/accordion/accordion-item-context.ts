import type { ItemProps } from '@zag-js/accordion'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface AccordionItemContext extends ComputedRef<ItemProps> {}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

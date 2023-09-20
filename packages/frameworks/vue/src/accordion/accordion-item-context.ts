import type { ItemProps } from '@zag-js/accordion'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export type AccordionItemContext = ComputedRef<ItemProps>

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

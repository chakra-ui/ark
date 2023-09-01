import type { ItemProps, ItemState } from '@zag-js/accordion'
import { createContext } from '../context'

export type AccordionItemContext = ItemProps & ItemState

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

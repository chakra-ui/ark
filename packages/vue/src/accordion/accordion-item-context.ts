import type { UnwrapRef } from 'vue'
import { createContext } from '../context'
import type { AccordionContext } from './accordion-context'

export type AccordionItemContext = ReturnType<UnwrapRef<AccordionContext>['getItemState']> & {
  value: string
  disabled?: boolean
}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

import { createContext } from '../context'

export interface AccordionItemContext {
  value: string
  disabled?: boolean
}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<AccordionItemContext>('AccordionItemContext')

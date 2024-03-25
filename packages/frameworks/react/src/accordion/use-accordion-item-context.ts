import type { ItemProps, ItemState } from '@zag-js/accordion'
import { createContext } from '../create-context'

// TODO unify with ItemProps and ItemState
export interface UseAccordionItemContext extends ItemProps, ItemState {}

export const [AccordionItemProvider, useAccordionItemContext] =
  createContext<UseAccordionItemContext>({
    name: 'AccordionItemContext',
    hookName: 'useAccordionItemContext',
    providerName: '<AccordionItemProvider />',
  })

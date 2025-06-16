import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemState } from '@zag-js/accordion'

export interface UseAccordionItemContext extends Accessor<ItemState> {}

export const [AccordionItemProvider, useAccordionItemContext] = createContext<UseAccordionItemContext>({
  name: 'AccordionItemContext',
  hookName: 'useAccordionItemContext',
  providerName: '<AccordionItemProvider />',
})

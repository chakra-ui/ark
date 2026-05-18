import type { ItemProps } from '@zag-js/accordion'
import { createContext } from '../../utils/create-context.ts'

export const [AccordionItemPropsProvider, useAccordionItemPropsContext] = createContext<ItemProps>({
  hookName: 'useAccordionItemPropsContext',
  providerName: '<AccordionItemPropsProvider />',
})

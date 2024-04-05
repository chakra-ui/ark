import type { ItemProps } from '@zag-js/accordion'
import { createContext } from '../create-context'

export interface UseAccordionItemPropsContext extends ItemProps {}

export const [AccordionItemPropsProvider, useAccordionItemPropsContext] = createContext<ItemProps>({
  name: 'AccordionItemPropsContext',
  hookName: 'useAccordionItemPropsContext',
  providerName: '<AccordionItemPropsProvider />',
})

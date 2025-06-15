import type { Accessor } from '$lib/types'
import type { ItemProps } from '@zag-js/accordion'
import { createContext } from '../../utils/create-context'

export interface UseAccordionItemPropsContext extends Accessor<ItemProps> {}

export const [AccordionItemPropsProvider, useAccordionItemPropsContext] = createContext<UseAccordionItemPropsContext>({
  name: 'AccordionItemPropsContext',
  hookName: 'useAccordionItemPropsContext',
  providerName: '<AccordionItemPropsProvider />',
})

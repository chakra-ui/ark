import type { ItemProps } from '@zag-js/accordion'
import type { Ref } from 'vue'
import { createContext } from '../../utils'

export interface UseAccordionItemPropsContext extends Ref<ItemProps> {}

export const [AccordionItemPropsProvider, useAccordionItemPropsContext] =
  createContext<UseAccordionItemPropsContext>('AccordionItemPropsContext')

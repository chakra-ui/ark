import type { ItemProps } from '@zag-js/accordion'
import { createContext } from '../../utils'

export interface UseAccordionItemPropsContext extends ItemProps {}

export const [AccordionItemPropsProvider, useAccordionItemPropsContext] =
  createContext<UseAccordionItemPropsContext>('AccordionItemPropsContext')

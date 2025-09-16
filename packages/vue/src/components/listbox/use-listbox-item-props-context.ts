import type { ItemProps } from '@zag-js/listbox'
import { createContext } from '../../utils/create-context'

export interface UseListboxItemPropsContext extends ItemProps {}

export const [ListboxItemPropsProvider, useListboxItemPropsContext] =
  createContext<UseListboxItemPropsContext>('ListboxItemPropsContext')

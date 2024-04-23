import type { ItemGroupProps } from '@zag-js/select'
import { createContext } from '../../utils/create-context'

export interface UseSelectItemGroupPropsContext extends ItemGroupProps {}

export const [SelectItemGroupPropsProvider, useSelectItemGroupPropsContext] =
  createContext<ItemGroupProps>({
    hookName: 'useSelectItemGroupPropsContext',
    providerName: '<SelectItemGroupPropsProvider />',
  })

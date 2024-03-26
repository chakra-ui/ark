import type { ItemProps, ItemState } from '@zag-js/radio-group'
import { createContext } from '../create-context'

export interface UseRadioGroupItemContext extends ItemState {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<UseRadioGroupItemContext>({
    name: 'RadioGroupItemContext',
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<ItemProps>({
    name: 'RadioGroupItemPropsContext',
    hookName: 'useRadioGroupItemPropsContext',
    providerName: '<RadioGroupItemPropsProvider />',
  })

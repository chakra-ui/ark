import type { ItemProps, ItemState } from '@zag-js/radio-group'
import type { Accessor } from 'solid-js'
import { createContext } from '~/utils/create-context'

export interface UseRadioGroupItemContext extends Accessor<ItemState> {}

export const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<UseRadioGroupItemContext>({
    hookName: 'useRadioGroupItemContext',
    providerName: '<RadioGroupItemProvider />',
  })

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<ItemProps>({
    hookName: 'useRadioGroupItemPropsContext',
    providerName: '<RadioGroupItemPropsProvider />',
  })

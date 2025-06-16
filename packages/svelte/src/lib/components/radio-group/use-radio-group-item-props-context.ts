import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemProps } from '@zag-js/radio-group'

export interface UseRadioGroupItemPropsContext extends Accessor<ItemProps> {}

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<UseRadioGroupItemPropsContext>({
    name: 'RadioGroupItemPropsContext',
    hookName: 'useRadioGroupItemPropsContext',
    providerName: '<RadioGroupItemPropsProvider />',
  })

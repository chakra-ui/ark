import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '~/utils/create-context'

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] =
  createContext<ItemProps>({
    name: 'RadioGroupItemPropsContext',
    hookName: 'useRadioGroupItemPropsContext',
    providerName: '<RadioGroupItemPropsProvider />',
  })

import type { ItemProps } from '@zag-js/radio-group'
import { createContext } from '../../utils/create-context.ts'

export const [RadioGroupItemPropsProvider, useRadioGroupItemPropsContext] = createContext<ItemProps>({
  hookName: 'useRadioGroupItemPropsContext',
  providerName: '<RadioGroupItemPropsProvider />',
})

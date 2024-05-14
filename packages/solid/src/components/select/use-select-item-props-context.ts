import type { ItemProps } from '@zag-js/select'
import { createContext } from '../../utils/create-context'

export const [SelectItemPropsProvider, useSelectItemPropsContext] = createContext<ItemProps>({
  hookName: 'useSelectItemPropsContext',
  providerName: '<SelectItemPropsProvider />',
})

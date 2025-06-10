import type { ItemBaseProps } from '@zag-js/menu'
import { createContext } from '../../utils/create-context'

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<ItemBaseProps>({
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})

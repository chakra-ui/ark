import type { ItemProps } from '@zag-js/navigation-menu'
import { createContext } from '../../utils/create-context'

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<ItemProps>({
  hookName: 'useNavigationMenuItemPropsContext',
  providerName: '<NavigationMenuItemPropsProvider />',
  strict: false,
})

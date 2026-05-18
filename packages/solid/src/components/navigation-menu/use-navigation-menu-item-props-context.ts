import type { ItemProps } from '@zag-js/navigation-menu'
import { createContext } from '../../utils/create-context.ts'

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<ItemProps>({
  hookName: 'useNavigationMenuItemPropsContext',
  providerName: '<NavigationMenuItemPropsProvider />',
  strict: false,
})

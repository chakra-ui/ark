import type { ItemProps } from '@zag-js/navigation-menu'
import { createContext } from '../../utils/create-context'

export interface UseNavigationMenuItemPropsContext extends ItemProps {}

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<ItemProps>({
  name: 'NavigationMenuItemPropsContext',
  hookName: 'useNavigationMenuItemPropsContext',
  providerName: '<NavigationMenuItemPropsProvider />',
  strict: false,
})

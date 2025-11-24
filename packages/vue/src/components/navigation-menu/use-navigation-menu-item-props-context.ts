import type { ItemProps } from '@zag-js/navigation-menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<
  ComputedRef<ItemProps>
>('NavigationMenuItemPropsContext')

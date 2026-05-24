import type { ItemProps } from '@zag-js/navigation-menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<
  ComputedRef<ItemProps>
>('NavigationMenuItemPropsContext')

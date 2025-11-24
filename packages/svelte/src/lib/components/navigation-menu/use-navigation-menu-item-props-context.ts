import type { ItemProps } from '@zag-js/navigation-menu'
import { createContext } from '$lib/utils/create-context'
import type { Accessor } from '$lib/types'

export const [NavigationMenuItemPropsProvider, useNavigationMenuItemPropsContext] = createContext<Accessor<ItemProps>>({
  name: 'NavigationMenuItemPropsContext',
  strict: false,
})

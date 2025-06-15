import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { ItemBaseProps } from '@zag-js/menu'

export const [MenuItemPropsProvider, useMenuItemPropsContext] = createContext<Accessor<ItemBaseProps>>({
  name: 'MenuItemPropsContext',
  hookName: 'useMenuItemPropsContext',
  providerName: '<MenuItemPropsProvider />',
})

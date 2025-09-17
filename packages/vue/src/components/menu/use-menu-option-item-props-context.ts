import type { ItemBaseProps } from '@zag-js/menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export const [MenuItemPropsProvider, useMenuItemPropsContext] =
  createContext<ComputedRef<ItemBaseProps>>('MenuItemPropsContext')

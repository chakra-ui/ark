import type { ItemState, OptionItemProps } from '@zag-js/menu'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'

export interface MenuOptionItemContext extends ComputedRef<ItemState> {}

export const [MenuOptionItemProvider, useMenuOptionItemContext] =
  createContext<MenuOptionItemContext>('MenuOptionItemContext')

export const [MenuOptionItemPropsProvider, useMenuOptionItemPropsContext] =
  createContext<OptionItemProps>('MenuOptionItemPropsContext')

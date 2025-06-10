import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

interface BaseItemProps {
  checked?: boolean
  value?: string
}

export const [MenuItemPropsProvider, useMenuItemPropsContext] =
  createContext<ComputedRef<BaseItemProps>>('MenuItemPropsContext')

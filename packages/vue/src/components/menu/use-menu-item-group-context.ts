import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface ValueChangeDetails {
  value: string
}

export interface RadioItemGroupProps {
  id: string
  value?: string
  onValueChange?: (e: ValueChangeDetails) => void
}

export type UseMenuItemGroupContext = ComputedRef<RadioItemGroupProps>

export const [MenuItemGroupProvider, useMenuItemGroupContext] =
  createContext<UseMenuItemGroupContext>('MenuItemGroupContext')

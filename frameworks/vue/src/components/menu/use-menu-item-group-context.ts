import { createContext } from '../../utils'

export interface ValueChangeDetails {
  value: string
}

export interface UseMenuItemGroupContext {
  id: string
  value?: string
  onValueChange?: (e: ValueChangeDetails) => void
}

export const [MenuItemGroupProvider, useMenuItemGroupContext] =
  createContext<UseMenuItemGroupContext>('MenuItemGroupContext')

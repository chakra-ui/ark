import { createContext } from '../../utils/create-context'

export interface ValueChangeDetails {
  value: string
}

export interface UseMenuItemGroupContext {
  id: string
  value?: string
  onValueChange?: (e: ValueChangeDetails) => void
}

export const [MenuItemGroupProvider, useMenuItemGroupContext] =
  createContext<UseMenuItemGroupContext>({
    hookName: 'useMenuItemGroupContext',
    providerName: '<MenuItemGroupProvider />',
  })

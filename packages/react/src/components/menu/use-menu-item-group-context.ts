import { createContext } from '../../utils/create-context'

export interface ValueChangeDetails {
  value: string
}

export interface UseMenuItemGroupContext {
  id: string
  value?: string | undefined
  onValueChange?: ((e: ValueChangeDetails) => void) | undefined
}

export const [MenuItemGroupProvider, useMenuItemGroupContext] = createContext<UseMenuItemGroupContext>({
  name: 'MenuItemGroupContext',
  hookName: 'useMenuItemGroupContext',
  providerName: '<MenuItemGroupProvider />',
})

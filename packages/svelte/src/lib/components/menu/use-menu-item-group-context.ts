import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'

export interface ValueChangeDetails {
  value: string
}

export interface UseMenuItemGroupContext extends Accessor<{
  id: string
  value?: string
  onValueChange?: (e: ValueChangeDetails) => void
}> {}

export const [MenuItemGroupProvider, useMenuItemGroupContext] = createContext<UseMenuItemGroupContext>({
  name: 'MenuItemGroupContext',
  hookName: 'useMenuItemGroupContext',
  providerName: '<MenuItemGroupProvider />',
})

import type { OptionItemState } from '@zag-js/menu'
import { createContext } from '../create-context'
import type { Optional } from '../types'

export interface UseMenuItemContext extends Optional<OptionItemState, 'isChecked'> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

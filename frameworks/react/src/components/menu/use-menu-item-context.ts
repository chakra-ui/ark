import type { OptionItemState } from '@zag-js/menu'
import type { Optional } from '../../types'
import { createContext } from '../../utils/create-context'

export interface UseMenuItemContext extends Optional<OptionItemState, 'checked'> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

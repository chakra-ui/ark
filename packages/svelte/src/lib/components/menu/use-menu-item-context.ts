import type { Accessor, Optional } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { OptionItemState } from '@zag-js/menu'

export interface UseMenuItemContext extends Accessor<Optional<OptionItemState, 'checked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

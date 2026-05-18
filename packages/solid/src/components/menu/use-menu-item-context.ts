import type { OptionItemState } from '@zag-js/menu'
import type { Accessor } from 'solid-js'
import type { Optional } from '../../types.ts'
import { createContext } from '../../utils/create-context.ts'

export interface UseMenuItemContext extends Accessor<Optional<OptionItemState, 'checked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

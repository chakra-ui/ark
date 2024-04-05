import type { OptionItemState } from '@zag-js/menu'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'
import type { Optional } from '../types'

export interface UseMenuItemContext extends Accessor<Optional<OptionItemState, 'isChecked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

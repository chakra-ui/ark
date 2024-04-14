import type { OptionItemState } from '@zag-js/menu'
import type { Accessor } from 'solid-js'
import type { Optional } from '../../types'
import { createContext } from '../../utils/create-context'

export interface UseMenuItemContext extends Accessor<Optional<OptionItemState, 'isChecked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

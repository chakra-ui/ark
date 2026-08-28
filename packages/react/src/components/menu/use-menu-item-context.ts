'use client'

import type { OptionItemState } from '@zag-js/menu'
import type { Optional } from '../../types.ts'
import { createContext } from '../../utils/create-context.ts'

export interface UseMenuItemContext extends Optional<OptionItemState, 'checked'> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>({
  name: 'MenuItemContext',
  hookName: 'useMenuItemContext',
  providerName: '<MenuItemProvider />',
})

import type { OptionItemState } from '@zag-js/menu'
import type { Optional } from '../../types'
import { createContext } from '../../utils'

export interface UseMenuItemContext extends Optional<OptionItemState, 'isChecked'> {}

export const [MenuItemProvider, useMenuItemContext] =
  createContext<UseMenuItemContext>('MenuItemContext')

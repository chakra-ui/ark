import type { OptionItemState } from '@zag-js/menu'
import type { ComputedRef } from 'vue'
import type { Optional } from '../../types'
import { createContext } from '../../utils'

export interface UseMenuItemContext extends ComputedRef<Optional<OptionItemState, 'isChecked'>> {}

export const [MenuItemProvider, useMenuItemContext] =
  createContext<UseMenuItemContext>('MenuItemContext')

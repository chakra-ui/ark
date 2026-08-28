import type { OptionItemState } from '@zag-js/menu'
import type { ComputedRef } from 'vue'
import type { Optional } from '../../types.ts'
import { createContext } from '../../utils/create-context.ts'

export interface UseMenuItemContext extends ComputedRef<Optional<OptionItemState, 'checked'>> {}

export const [MenuItemProvider, useMenuItemContext] = createContext<UseMenuItemContext>('MenuItemContext')

import type { ItemState } from '@zag-js/combobox'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'

export interface UseCommandItemContext extends ComputedRef<ItemState> {}

export const [CommandItemProvider, useCommandItemContext] = createContext<UseCommandItemContext>('CommandItemContext')

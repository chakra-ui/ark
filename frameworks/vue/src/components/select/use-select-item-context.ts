import type { ItemState } from '@zag-js/select'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseSelectItemContext extends ComputedRef<ItemState> {}

export const [SelectItemProvider, useSelectItemContext] =
  createContext<UseSelectItemContext>('SelectItemContext')

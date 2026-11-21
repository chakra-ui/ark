import type { ItemState } from '@zag-js/cascade-select'
import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context'

export interface UseCascadeSelectItemContext extends ComputedRef<ItemState> {}

export const [CascadeSelectItemProvider, useCascadeSelectItemContext] =
  createContext<UseCascadeSelectItemContext>('CascadeSelectItemContext')

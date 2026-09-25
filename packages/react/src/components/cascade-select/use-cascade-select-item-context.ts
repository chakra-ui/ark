import type { ItemState } from '@zag-js/cascade-select'
import { createContext } from '../../utils/create-context'

export interface UseCascadeSelectItemContext extends ItemState {}

export const [CascadeSelectItemProvider, useCascadeSelectItemContext] = createContext<UseCascadeSelectItemContext>({
  name: 'CascadeSelectItemContext',
  hookName: 'useCascadeSelectItemContext',
  providerName: '<CascadeSelectItemProvider />',
})

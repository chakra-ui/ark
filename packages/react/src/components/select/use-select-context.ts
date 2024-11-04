import { createContext } from '../../utils/create-context'
import type { CollectionItem } from '../collection'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<CollectionItem>>({
  name: 'SelectContext',
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

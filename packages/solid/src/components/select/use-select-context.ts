import type { CollectionItem } from '../../types'
import { createContext } from '../../utils/create-context'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<any>>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

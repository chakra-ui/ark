import { createContext } from '../../utils/create-context'
import type { CollectionItem } from '../collection'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<any>>({
  name: 'SelectContext',
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

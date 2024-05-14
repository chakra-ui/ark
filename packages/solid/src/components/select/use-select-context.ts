import type { CollectionItem } from '../../types'
import { createContext } from '../../utils/create-context'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<any>>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

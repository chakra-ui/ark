import { createContext } from '../create-context'
import type { CollectionItem } from '../types'
import { type UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<any>>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

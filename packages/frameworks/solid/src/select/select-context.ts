import { createContext } from '../create-context'
import type { CollectionItem } from '../types'
import { type UseSelectReturn } from './use-select'

export interface SelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const [SelectProvider, useSelectContext] = createContext<SelectContext<any>>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

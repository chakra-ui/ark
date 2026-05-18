import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.tsx'
import type { UseSelectReturn } from './use-select.ts'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext<any>>({
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

import { createContext } from '../../utils/create-context'
import type { CollectionItem } from '../collection'
import type { UseListboxReturn } from './use-listbox'

export interface UseListboxContext<T extends CollectionItem> extends UseListboxReturn<T> {}

export const [ListboxProvider, useListboxContext] = createContext<UseListboxContext<CollectionItem>>({
  hookName: 'useListboxContext',
  providerName: '<ListboxProvider />',
})

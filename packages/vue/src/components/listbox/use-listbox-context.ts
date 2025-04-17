import { createContext } from '../../utils'
import type { CollectionItem } from '../collection'
import type { UseListboxReturn } from './use-listbox'

export interface UseListboxContext<T extends CollectionItem> extends UseListboxReturn<T> {}

export const [ListboxProvider, useListboxContext] = createContext<UseListboxContext<CollectionItem>>('ListboxContext')

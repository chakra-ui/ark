import { createContext } from '../../utils'
import type { CollectionItem } from '../collection'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] =
  createContext<UseSelectContext<CollectionItem>>('SelectContext')

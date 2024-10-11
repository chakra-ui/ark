import { createContext } from '../../utils'
import type { CollectionItem } from '../collection'
import type { UseSelectReturn } from './use-select'

export interface UseSelectContext<T extends CollectionItem = CollectionItem>
  extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createContext<UseSelectContext<any>>('SelectContext')

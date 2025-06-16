import { createContext } from '$lib/utils/create-context'
import type { CollectionItem } from '../collection'
import type { UseSelectReturn } from './use-select.svelte'

export interface UseSelectContext<T extends CollectionItem = CollectionItem> extends UseSelectReturn<T> {}

export const [SelectProvider, useSelectContext] = createContext<UseSelectContext>({
  name: 'SelectContext',
})

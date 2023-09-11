import type { CollectionItem } from '@zag-js/select'
import { createContext } from '../create-context'
import { type UseSelectReturn } from './use-select'

export type SelectContext<T extends CollectionItem> = UseSelectReturn<T>

export const [SelectProvider, useSelectContext] = createContext<SelectContext>({
  name: 'SelectContext',
  hookName: 'useSelectContext',
  providerName: '<SelectProvider />',
})

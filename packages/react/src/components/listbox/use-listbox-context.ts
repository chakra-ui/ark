'use client'

import { createContext } from '../../utils/create-context.ts'
import type { CollectionItem } from '../collection/index.ts'
import type { UseListboxReturn } from './use-listbox.ts'

export interface UseListboxContext<T extends CollectionItem> extends UseListboxReturn<T> {}

export const [ListboxProvider, useListboxContext] = createContext<UseListboxContext<CollectionItem>>({
  name: 'ListboxContext',
  hookName: 'useListboxContext',
  providerName: '<ListboxProvider />',
})

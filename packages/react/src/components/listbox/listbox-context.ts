import type { ReactNode } from 'react'
import type { CollectionItem } from '../collection'
import { type UseListboxContext, useListboxContext } from './use-listbox-context'

export interface ListboxContextProps<T extends CollectionItem> {
  children: (context: UseListboxContext<T>) => ReactNode
}

export const ListboxContext = <T extends CollectionItem>(props: ListboxContextProps<T>) =>
  props.children(useListboxContext())

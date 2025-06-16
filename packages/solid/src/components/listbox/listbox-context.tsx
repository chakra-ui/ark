import type { JSX } from 'solid-js'
import type { CollectionItem } from '../collection'
import { type UseListboxContext, useListboxContext } from './use-listbox-context'

export interface ListboxContextProps<T extends CollectionItem> {
  children: (context: UseListboxContext<T>) => JSX.Element
}

export function ListboxContext<T extends CollectionItem>(props: ListboxContextProps<T>) {
  return props.children(useListboxContext())
}

import type { JSX } from '@solidjs/web'
import type { CollectionItem } from '../collection/index.tsx'
import { type UseListboxContext, useListboxContext } from './use-listbox-context.ts'

export interface ListboxContextProps<T extends CollectionItem> {
  children: (context: UseListboxContext<T>) => JSX.Element
}

export function ListboxContext<T extends CollectionItem>(props: ListboxContextProps<T>) {
  return props.children(useListboxContext())
}

import type { JSX } from '@solidjs/web'
import { type UseListboxItemContext, useListboxItemContext } from './use-listbox-item-context.ts'

export interface ListboxItemContextProps {
  children: (context: UseListboxItemContext) => JSX.Element
}

export function ListboxItemContext(props: ListboxItemContextProps) {
  return props.children(useListboxItemContext())
}

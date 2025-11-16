import type { JSX } from 'solid-js'
import { type UseSelectContext, useSelectContext } from './use-select-context'
import type { CollectionItem } from '../collection'

export interface SelectContextProps<T extends CollectionItem> {
  children: (context: UseSelectContext<T>) => JSX.Element
}

export const SelectContext = <T extends CollectionItem>(props: SelectContextProps<T>) =>
  props.children(useSelectContext())

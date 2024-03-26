import type { CollectionItem } from '../types'
import { useSelectContext, type UseSelectContext } from './use-select-context'

export interface SelectContextProps<T extends CollectionItem> {
  children: (context: UseSelectContext<T>) => React.ReactNode
}

export const SelectContext = <T extends CollectionItem>(props: SelectContextProps<T>) =>
  props.children(useSelectContext())

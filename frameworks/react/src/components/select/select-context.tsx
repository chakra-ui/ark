import type { ReactNode } from 'react'
import type { CollectionItem } from '~/types'
import { type UseSelectContext, useSelectContext } from './use-select-context'

export interface SelectContextProps<T extends CollectionItem> {
  children: (context: UseSelectContext<T>) => ReactNode
}

export const SelectContext = <T extends CollectionItem>(props: SelectContextProps<T>) =>
  props.children(useSelectContext())

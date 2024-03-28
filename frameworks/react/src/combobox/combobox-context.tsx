import type { ReactNode } from 'react'
import type { CollectionItem } from '../types'
import { useComboboxContext, type UseComboboxContext } from './use-combobox-context'

export interface ComboboxContextProps<T extends CollectionItem> {
  children: (context: UseComboboxContext<T>) => ReactNode
}

export const ComboboxContext = <T extends CollectionItem>(props: ComboboxContextProps<T>) =>
  props.children(useComboboxContext())

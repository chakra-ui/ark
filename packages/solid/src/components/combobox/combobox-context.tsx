import type { JSX } from 'solid-js'
import type { CollectionItem } from '../collection/index.tsx'
import { type UseComboboxContext, useComboboxContext } from './use-combobox-context.ts'

export interface ComboboxContextProps<T extends CollectionItem> {
  children: (context: UseComboboxContext<T>) => JSX.Element
}

export const ComboboxContext = <T extends CollectionItem>(props: ComboboxContextProps<T>) =>
  props.children(useComboboxContext())

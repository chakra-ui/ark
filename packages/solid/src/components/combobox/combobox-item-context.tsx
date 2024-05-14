import type { JSX } from 'solid-js'
import { type UseComboboxItemContext, useComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps {
  children: (context: UseComboboxItemContext) => JSX.Element
}

export const ComboboxItemContext = (props: ComboboxItemContextProps) =>
  props.children(useComboboxItemContext())

import type { JSX } from 'solid-js'
import { useComboboxItemContext, type UseComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps {
  children: (context: UseComboboxItemContext) => JSX.Element
}

export const ComboboxItemContext = (props: ComboboxItemContextProps) =>
  props.children(useComboboxItemContext())

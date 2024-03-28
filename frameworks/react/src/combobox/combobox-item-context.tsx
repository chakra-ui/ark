import type { ReactNode } from 'react'
import { useComboboxItemContext, type UseComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps {
  children: (context: UseComboboxItemContext) => ReactNode
}

export const ComboboxItemContext = (props: ComboboxItemContextProps) =>
  props.children(useComboboxItemContext())

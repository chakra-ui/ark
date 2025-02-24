import type { ReactNode } from 'react'
import { type UseComboboxItemContext, useComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps {
  children: (context: UseComboboxItemContext) => ReactNode
}

export const ComboboxItemContext = (props: ComboboxItemContextProps) => props.children(useComboboxItemContext())

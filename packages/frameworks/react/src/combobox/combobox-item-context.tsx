import { useComboboxItemContext, type UseComboboxItemContext } from './use-combobox-item-context'

export interface ComboboxItemContextProps {
  children: (context: UseComboboxItemContext) => React.ReactNode
}

export const ComboboxItemContext = (props: ComboboxItemContextProps) =>
  props.children(useComboboxItemContext())

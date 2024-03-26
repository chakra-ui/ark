import { useSelectItemContext, type UseSelectItemContext } from './use-select-item-context'

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => React.ReactNode
}

export const SelectItemContext = (props: SelectItemContextProps) =>
  props.children(useSelectItemContext())

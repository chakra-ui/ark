import type { JSX } from 'solid-js'
import { useSelectItemContext, type UseSelectItemContext } from './use-select-item-context'

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => JSX.Element
}

export const SelectItemContext = (props: SelectItemContextProps) =>
  props.children(useSelectItemContext())

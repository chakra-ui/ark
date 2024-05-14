import type { JSX } from 'solid-js'
import { type UseSelectItemContext, useSelectItemContext } from './use-select-item-context'

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => JSX.Element
}

export const SelectItemContext = (props: SelectItemContextProps) =>
  props.children(useSelectItemContext())

import type { JSX } from '@solidjs/web'
import { type UseSelectItemContext, useSelectItemContext } from './use-select-item-context.ts'

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => JSX.Element
}

export const SelectItemContext = (props: SelectItemContextProps) => props.children(useSelectItemContext())

import type { ReactNode } from 'react'
import { type UseSelectItemContext, useSelectItemContext } from './use-select-item-context'

export interface SelectItemContextProps {
  children: (context: UseSelectItemContext) => ReactNode
}

export const SelectItemContext = (props: SelectItemContextProps) => props.children(useSelectItemContext())

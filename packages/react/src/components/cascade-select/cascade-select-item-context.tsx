import type { ReactNode } from 'react'
import { type UseCascadeSelectItemContext, useCascadeSelectItemContext } from './use-cascade-select-item-context'

export interface CascadeSelectItemContextProps {
  children: (context: UseCascadeSelectItemContext) => ReactNode
}

export const CascadeSelectItemContext = (props: CascadeSelectItemContextProps) =>
  props.children(useCascadeSelectItemContext())

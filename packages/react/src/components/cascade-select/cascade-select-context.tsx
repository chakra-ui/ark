import type { ReactNode } from 'react'
import { type UseCascadeSelectContext, useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps {
  children: (context: UseCascadeSelectContext) => ReactNode
}

export const CascadeSelectContext = (props: CascadeSelectContextProps) => props.children(useCascadeSelectContext())

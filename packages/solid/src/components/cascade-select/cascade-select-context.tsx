import type { JSX } from 'solid-js'
import { type UseCascadeSelectContext, useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps {
  children: (context: UseCascadeSelectContext) => JSX.Element
}

export const CascadeSelectContext = (props: CascadeSelectContextProps) => props.children(useCascadeSelectContext())

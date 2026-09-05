import type { JSX } from 'solid-js'
import { type UseCascadeSelectItemContext, useCascadeSelectItemContext } from './use-cascade-select-item-context'

export interface CascadeSelectItemContextProps {
  children: (context: UseCascadeSelectItemContext) => JSX.Element
}

export const CascadeSelectItemContext = (props: CascadeSelectItemContextProps) =>
  props.children(useCascadeSelectItemContext())

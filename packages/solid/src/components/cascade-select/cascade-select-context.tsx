import type { JSX } from 'solid-js'
import type { TreeNode } from '../collection'
import { type UseCascadeSelectContext, useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps<T extends TreeNode> {
  children: (context: UseCascadeSelectContext<T>) => JSX.Element
}

export const CascadeSelectContext = <T extends TreeNode>(props: CascadeSelectContextProps<T>) =>
  props.children(useCascadeSelectContext())

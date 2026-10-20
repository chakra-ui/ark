import type { TreeNode } from '../collection'
import { type UseCascadeSelectContext, useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectContextProps<T extends TreeNode> {
  children: (context: UseCascadeSelectContext<T>) => React.ReactNode
}

export const CascadeSelectContext = <T extends TreeNode>(props: CascadeSelectContextProps<T>) =>
  props.children(useCascadeSelectContext())

import { createContext } from '../../utils/create-context'
import type { TreeNode as CascadeSelectNode } from '../collection'
import type { UseCascadeSelectReturn } from './use-cascade-select'

export interface UseCascadeSelectContext<T extends CascadeSelectNode> extends UseCascadeSelectReturn<T> {}

export const [CascadeSelectProvider, useCascadeSelectContext] =
  createContext<UseCascadeSelectContext<CascadeSelectNode>>('CascadeSelectContext')

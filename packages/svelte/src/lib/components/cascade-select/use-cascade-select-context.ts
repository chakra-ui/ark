import { createContext } from '$lib/utils/create-context'
import type { TreeNode as CascadeSelectNode } from '../collection'
import type { UseCascadeSelectReturn } from './use-cascade-select.svelte'

export interface UseCascadeSelectContext<
  T extends CascadeSelectNode = CascadeSelectNode,
> extends UseCascadeSelectReturn<T> {}

export const [CascadeSelectProvider, useCascadeSelectContext] = createContext<UseCascadeSelectContext>({
  name: 'CascadeSelectContext',
})

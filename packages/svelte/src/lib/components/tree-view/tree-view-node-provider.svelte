<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { TreeNode } from '../collection/index.ts'

  export interface TreeViewNodeProviderBaseProps<T extends TreeNode> {
    node: T
    indexPath: number[]
  }
  export interface TreeViewNodeProviderProps<T extends TreeNode> extends TreeViewNodeProviderBaseProps<T> {
    children?: Snippet
  }
</script>

<script lang="ts" generics="T extends TreeNode">
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { TreeViewNodeProvider } from './use-tree-view-node-context.ts'
  import { TreeViewNodePropsProvider } from './use-tree-view-node-props-context.ts'

  let { node, indexPath, children }: TreeViewNodeProviderProps<T> = $props()

  const treeView = useTreeViewContext()
  const nodeProps = $derived({ node, indexPath })
  const nodeState = $derived(treeView().getNodeState(nodeProps))

  TreeViewNodeProvider(() => nodeState)
  TreeViewNodePropsProvider(() => nodeProps)
</script>

{@render children?.()}

<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { TreeNode } from '../collection'
  import type { UseTreeViewContext } from './use-tree-view-context'

  export interface TreeViewContextProps {
    render: Snippet<[UseTreeViewContext<TreeNode>]>
  }
</script>

<script lang="ts">
  import { useTreeViewContext } from './use-tree-view-context'

  const { render }: TreeViewContextProps = $props()

  const treeView = useTreeViewContext()
</script>

{@render render(treeView)}

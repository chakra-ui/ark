<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { TreeNode } from '../collection/index.ts'
  import type { UseTreeViewContext } from './use-tree-view-context.ts'

  export interface TreeViewContextProps {
    render: Snippet<[UseTreeViewContext<TreeNode>]>
  }
</script>

<script lang="ts">
  import { useTreeViewContext } from './use-tree-view-context.ts'

  const { render }: TreeViewContextProps = $props()

  const treeView = useTreeViewContext()
</script>

{@render render(treeView)}

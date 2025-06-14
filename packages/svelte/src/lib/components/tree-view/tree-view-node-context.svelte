<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { UseTreeViewNodeContext } from './use-tree-view-node-context'
  import type { TreeNode } from '@zag-js/collection'

  export interface TreeViewNodeContextProps {
    render: Snippet<[UseTreeViewNodeContext]>
  }
</script>

<script lang="ts" generics="T extends TreeNode">
  import { useTreeViewNodeContext } from './use-tree-view-node-context'

  const { render }: TreeViewNodeContextProps = $props()

  const nodeContext = useTreeViewNodeContext()
</script>

{@render render(nodeContext)}

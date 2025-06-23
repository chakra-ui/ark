<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface TreeViewNodeCheckboxIndicatorBaseProps {
    children?: Snippet
    indeterminate?: Snippet
    fallback?: Snippet
  }
  export interface TreeViewNodeCheckboxIndicatorProps extends TreeViewNodeCheckboxIndicatorBaseProps {}
</script>

<script lang="ts">
  import { useTreeViewNodeContext } from './use-tree-view-node-context'

  const { children, indeterminate, fallback }: TreeViewNodeCheckboxIndicatorProps = $props()

  const nodeState = useTreeViewNodeContext()
  const checkedState = $derived(nodeState().checked)
</script>

{#if checkedState === 'indeterminate' && indeterminate}
  {@render indeterminate()}
{:else if checkedState === true && children}
  {@render children()}
{:else if fallback}
  {@render fallback()}
{/if}
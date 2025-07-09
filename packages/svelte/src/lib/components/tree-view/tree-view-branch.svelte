<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewBranchBaseProps extends PolymorphicProps<'li'>, RefAttribute {}
  export interface TreeViewBranchProps extends Assign<HTMLProps<'li'>, TreeViewBranchBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Collapsible } from '../collapsible'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodeContext } from './use-tree-view-node-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  let { ref = $bindable(null), ...props }: TreeViewBranchProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()

  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = $derived(mergeProps(treeView().getBranchProps(nodeProps()), props))
  const branchContentProps = $derived(treeView().getBranchContentProps(nodeProps()))
</script>

<Collapsible.Root
  bind:ref
  open={nodeState().expanded}
  ids={{ content: branchContentProps.id! }}
  {...renderStrategyProps}
  {...mergedProps}
/>

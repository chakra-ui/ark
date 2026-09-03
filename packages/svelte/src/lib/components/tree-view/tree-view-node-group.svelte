<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewNodeGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TreeViewNodeGroupProps extends Assign<HTMLProps<'div'>, TreeViewNodeGroupBaseProps> {}
</script>

<script lang="ts">
  import { useRenderStrategyPropsContext } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Collapsible } from '../collapsible/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodeContext } from './use-tree-view-node-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewNodeGroupProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()

  const renderStrategyProps = useRenderStrategyPropsContext()
  const mergedProps = $derived(mergeProps(treeView().getNodeGroupProps(nodeProps()), props))
  const nodeGroupContentProps = $derived(treeView().getNodeGroupContentProps(nodeProps()))
</script>

<Collapsible.Root
  bind:ref
  open={nodeState().expanded}
  ids={{ content: nodeGroupContentProps.id! }}
  {...renderStrategyProps()}
  {...mergedProps}
/>

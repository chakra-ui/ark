<script module lang="ts">
  import type { NodeState } from '@zag-js/tree-view'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewNodeState extends NodeState {}
  export interface TreeViewNodeBaseProps extends PolymorphicProps<'div', TreeViewNodeState>, RefAttribute {}
  export interface TreeViewNodeProps extends Assign<HTMLProps<'div'>, TreeViewNodeBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewNodeProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getNodeProps(nodeProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} state={treeView().getNodeState(nodeProps())} />

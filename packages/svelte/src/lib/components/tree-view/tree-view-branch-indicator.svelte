<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TreeViewBranchIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface TreeViewBranchIndicatorProps extends Assign<HTMLProps<'div'>, TreeViewBranchIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  const props: TreeViewBranchIndicatorProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getBranchIndicatorProps(nodeProps()), props))
</script>

<Ark as="div" {...mergedProps} />

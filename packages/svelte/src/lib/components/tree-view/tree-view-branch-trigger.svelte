<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface TreeViewBranchTriggerProps extends Assign<HTMLProps<'button'>, TreeViewBranchTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  const props: TreeViewBranchTriggerProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getBranchTriggerProps(nodeProps()), props))
</script>

<Ark as="button" {...mergedProps} />

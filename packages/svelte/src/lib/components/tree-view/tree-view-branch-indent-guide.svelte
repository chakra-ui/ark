<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewBranchIndentGuideBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface TreeViewBranchIndentGuideProps extends Assign<
    HTMLProps<'div'>,
    TreeViewBranchIndentGuideBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  let { ref = $bindable(null), ...props }: TreeViewBranchIndentGuideProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getBranchIndentGuideProps(nodeProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

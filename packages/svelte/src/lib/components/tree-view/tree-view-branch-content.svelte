<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface TreeViewBranchContentBaseProps extends PolymorphicProps<'ul'> {
    ref?: Element | null
  }
  export interface TreeViewBranchContentProps extends Assign<HTMLProps<'ul'>, TreeViewBranchContentBaseProps> {}

  interface VisibilityProps {
    hidden?: boolean
    'data-state'?: string
  }
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Collapsible } from '../collapsible'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  const props: TreeViewBranchContentProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const contentProps = $derived(treeView().getBranchContentProps(nodeProps()))

  const splitVisibilityProps = createSplitProps<VisibilityProps>()
  const [, branchContentProps] = $derived(splitVisibilityProps(contentProps as any, ['hidden', 'data-state']))

  const mergedProps = $derived(mergeProps(branchContentProps, props))
</script>

<Collapsible.Content {...mergedProps} />

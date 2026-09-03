<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { HTMLAttributes } from 'svelte/elements'

  export interface TreeViewNodeGroupContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    ref?: Element | null
  }
  export interface TreeViewNodeGroupContentProps extends Assign<HTMLProps<'div'>, TreeViewNodeGroupContentBaseProps> {}

  interface VisibilityProps {
    hidden?: HTMLAttributes<HTMLElement>['hidden']
    'data-state'?: string | undefined
  }
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Collapsible } from '../collapsible/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), ...props }: TreeViewNodeGroupContentProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const contentProps = $derived(treeView().getNodeGroupContentProps(nodeProps()))

  const splitVisibilityProps = createSplitProps<VisibilityProps>()
  const [, nodeGroupContentProps] = $derived(splitVisibilityProps(contentProps, ['hidden', 'data-state']))

  const mergedProps = $derived(mergeProps(nodeGroupContentProps, props))
</script>

<Collapsible.Content bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewLabelBaseProps extends PolymorphicProps<'h3'>, RefAttribute {}
  export interface TreeViewLabelProps extends Assign<HTMLProps<'h3'>, TreeViewLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'

  let { ref = $bindable(null), ...props }: TreeViewLabelProps = $props()

  const treeView = useTreeViewContext()
  const mergedProps = $derived(mergeProps(treeView().getLabelProps(), props))
</script>

<Ark as="h3" bind:ref {...mergedProps} />

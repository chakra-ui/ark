<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewTreeBaseProps extends PolymorphicProps<'ul'>, RefAttribute {}
  export interface TreeViewTreeProps extends Assign<HTMLProps<'ul'>, TreeViewTreeBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'

  let { ref = $bindable(), ...props }: TreeViewTreeProps = $props()

  const treeView = useTreeViewContext()
  const mergedProps = $derived(mergeProps(treeView().getTreeProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

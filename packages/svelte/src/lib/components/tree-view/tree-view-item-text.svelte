<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TreeViewItemTextProps extends Assign<HTMLProps<'span'>, TreeViewItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  let { ref = $bindable(), ...props }: TreeViewItemTextProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getItemTextProps(nodeProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface TreeViewNodeRenameInputProps extends Assign<HTMLProps<'input'>, TreeViewNodeRenameInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  let { ref = $bindable(null), ...props }: TreeViewNodeRenameInputProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getNodeRenameInputProps(nodeProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />

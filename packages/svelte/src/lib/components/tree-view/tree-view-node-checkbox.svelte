<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface TreeViewNodeCheckboxBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface TreeViewNodeCheckboxProps extends Assign<HTMLProps<'span'>, TreeViewNodeCheckboxBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useTreeViewContext } from './use-tree-view-context'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

  let { ref = $bindable(), ...props }: TreeViewNodeCheckboxProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const mergedProps = $derived(mergeProps(treeView().getNodeCheckboxProps(nodeProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />

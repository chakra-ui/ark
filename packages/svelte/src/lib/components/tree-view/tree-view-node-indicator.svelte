<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { NodeIndicatorType } from '@zag-js/tree-view'

  export interface TreeViewNodeIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    /**
     * The type of indicator
     * - "expanded": always visible, reflects open/closed state
     * - "selected": shown when the node is selected
     * - "checked": shown when the node is checked
     * - "indeterminate": shown when the node is indeterminate (partially checked)
     */
    type: NodeIndicatorType
  }
  export interface TreeViewNodeIndicatorProps extends Assign<HTMLProps<'div'>, TreeViewNodeIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useTreeViewContext } from './use-tree-view-context.ts'
  import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

  let { ref = $bindable(null), type, ...props }: TreeViewNodeIndicatorProps = $props()

  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = $derived(mergeProps(treeView().getNodeIndicatorProps({ ...nodeProps(), type }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />

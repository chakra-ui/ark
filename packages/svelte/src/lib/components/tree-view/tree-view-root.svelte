<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { TreeNode } from '../collection'
  import type { UseTreeViewProps } from './use-tree-view.svelte'

  export interface TreeViewRootBaseProps<T extends TreeNode>
    extends UseTreeViewProps<T>,
      RenderStrategyProps,
      PolymorphicProps<'div'> {}

  export interface TreeViewRootProps<T extends TreeNode> extends Assign<HTMLProps<'div'>, TreeViewRootBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends TreeNode">
  import {
    RenderStrategyPropsProvider,
    splitRenderStrategyProps,
    type RenderStrategyProps,
  } from '$lib/utils/render-strategy'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { splitTreeViewProps } from './tree-view-split-props'
  import { TreeViewProvider } from './use-tree-view-context'
  import { useTreeView } from './use-tree-view.svelte'

  let {
    expandedValue = $bindable<string[]>(),
    selectedValue = $bindable<string[]>(),
    focusedValue = $bindable<string>(),
    ...props
  }: TreeViewRootProps<T> = $props()

  const [renderStrategyProps, treeViewProps] = $derived(splitRenderStrategyProps(props))
  const [useTreeViewProps, localProps] = $derived(splitTreeViewProps(treeViewProps))

  const id = $props.id()

  const machineProps = $derived.by(() => ({
    ...useTreeViewProps,
    id: useTreeViewProps.id ?? id,
    selectedValue,
    expandedValue,
    focusedValue,
    onExpandedChange: (details: any) => {
      useTreeViewProps.onExpandedChange?.(details)
      expandedValue = details.expandedValue
    },
    onFocusChange: (details: any) => {
      useTreeViewProps.onFocusChange?.(details)
      focusedValue = details.focusedValue
    },
    onSelectionChange: (details: any) => {
      useTreeViewProps.onSelectionChange?.(details)
      selectedValue = details.selectedValue
    },
  }))

  const treeView = useTreeView(() => machineProps)
  const mergedProps = $derived(mergeProps(treeView().getRootProps(), localProps))

  TreeViewProvider(treeView)
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" {...mergedProps} />

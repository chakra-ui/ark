<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { Snippet } from 'svelte'
  import type { TreeNode } from '../collection'
  import type { UseTreeViewProps } from './use-tree-view.svelte'

  export interface TreeViewRootBaseProps<T extends TreeNode>
    extends UseTreeViewProps<T>,
      RenderStrategyProps,
      PolymorphicProps<'div'>,
      RefAttribute {}

  export interface TreeViewRootProps<T extends TreeNode> extends Assign<HTMLProps<'div'>, TreeViewRootBaseProps<T>> {}

  export type TreeViewRootComponentProps<T extends TreeNode = TreeNode, P = {}> = Assign<TreeViewRootProps<T>, P>

  export type TreeViewRootComponent<P = {}> = <T extends TreeNode>(props: TreeViewRootComponentProps<T, P>) => Snippet
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
    ref = $bindable(null),
    expandedValue = $bindable<string[]>(),
    selectedValue = $bindable<string[]>(),
    focusedValue = $bindable<string>(),
    checkedValue = $bindable<string[]>(),
    ...props
  }: TreeViewRootProps<T> = $props()

  const [renderStrategyProps, treeViewProps] = $derived(splitRenderStrategyProps(props))
  const [useTreeViewProps, localProps] = $derived(splitTreeViewProps(treeViewProps))

  const id = $props.id()

  const machineProps = $derived.by<UseTreeViewProps<T>>(() => ({
    ...useTreeViewProps,
    id: useTreeViewProps.id ?? id,
    selectedValue,
    expandedValue,
    focusedValue,
    checkedValue,
    onExpandedChange: (details) => {
      useTreeViewProps.onExpandedChange?.(details)
      expandedValue = details.expandedValue
    },
    onFocusChange: (details) => {
      useTreeViewProps.onFocusChange?.(details)
      focusedValue = details.focusedValue
    },
    onSelectionChange: (details) => {
      useTreeViewProps.onSelectionChange?.(details)
      selectedValue = details.selectedValue
    },
    onCheckedChange: (details) => {
      useTreeViewProps.onCheckedChange?.(details)
      checkedValue = details.checkedValue
    },
  }))

  const treeView = useTreeView(() => machineProps)
  const mergedProps = $derived(mergeProps(treeView().getRootProps(), localProps))

  TreeViewProvider(treeView)
  RenderStrategyPropsProvider(() => renderStrategyProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />

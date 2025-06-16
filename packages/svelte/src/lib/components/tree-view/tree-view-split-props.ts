import { createSplitProps } from '$lib/utils/create-split-props'
import type { TreeNode } from '../collection'
import type { UseTreeViewProps } from './use-tree-view.svelte'

const splitFn = createSplitProps<UseTreeViewProps<TreeNode>>()

export function splitTreeViewProps<T extends UseTreeViewProps<TreeNode>>(props: T) {
  return splitFn(props, [
    'collection',
    'defaultExpandedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
    'loadChildren',
    'onLoadChildrenComplete',
  ])
}

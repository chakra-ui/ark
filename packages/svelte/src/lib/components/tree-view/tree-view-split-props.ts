import { createSplitProps } from '$lib/utils/create-split-props'
import type { TreeNode } from '../collection'
import type { UseTreeViewProps } from './use-tree-view.svelte'

const splitFn = createSplitProps<UseTreeViewProps<TreeNode>>()

export function splitTreeViewProps<T extends UseTreeViewProps<TreeNode>>(props: T) {
  return splitFn(props, [
    'checkedValue',
    'collection',
    'defaultCheckedValue',
    'defaultExpandedValue',
    'defaultFocusedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'loadChildren',
    'onCheckedChange',
    'onExpandedChange',
    'onFocusChange',
    'onLoadChildrenComplete',
    'onLoadChildrenError',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ])
}

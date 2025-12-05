import { createSplitProps } from '$lib/utils/create-split-props'
import type { TreeNode } from '../collection'
import type { UseTreeViewProps } from './use-tree-view.svelte'

const splitFn = createSplitProps<UseTreeViewProps<TreeNode>>()

export function splitTreeViewProps<T extends UseTreeViewProps<TreeNode>>(props: T) {
  return splitFn(props, [
    'canRename',
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
    'onBeforeRename',
    'onCheckedChange',
    'onExpandedChange',
    'onFocusChange',
    'onLoadChildrenComplete',
    'onLoadChildrenError',
    'onRenameComplete',
    'onRenameStart',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
    'scrollToIndexFn',
  ])
}

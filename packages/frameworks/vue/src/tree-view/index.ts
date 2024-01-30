import type {
  ExpandedChangeDetails as TreeViewExpandedChangeDetails,
  FocusChangeDetails as TreeViewFocusChangeDetails,
  SelectionChangeDetails as TreeViewSelectionChangeDetails,
} from '@zag-js/tree-view'
import { TreeViewBranch, type TreeViewBranchProps } from './tree-view-branch'
import { TreeViewBranchContent, type TreeViewBranchContentProps } from './tree-view-branch-content'
import { TreeViewBranchControl, type TreeViewBranchControlProps } from './tree-view-branch-control'
import {
  TreeViewBranchIndicator,
  type TreeViewBranchIndicatorProps,
} from './tree-view-branch-indicator'
import { TreeViewBranchText, type TreeViewBranchTextProps } from './tree-view-branch-text'
import { TreeViewBranchTrigger, type TreeViewBranchTriggerProps } from './tree-view-branch-trigger'
import { useTreeViewContext, type TreeViewContext } from './tree-view-context'
import { TreeViewItem, type TreeViewItemProps } from './tree-view-item'
import { TreeViewItemText, type TreeViewItemTextProps } from './tree-view-item-text'
import { TreeViewLabel, type TreeViewLabelProps } from './tree-view-label'
import { TreeViewRoot, type TreeViewRootProps } from './tree-view-root'
import { TreeViewTree, type TreeViewTreeProps } from './tree-view-tree'

export const TreeView = {
  Root: TreeViewRoot,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Branch: TreeViewBranch,
  Item: TreeViewItem,
  ItemText: TreeViewItemText,
  BranchContent: TreeViewBranchContent,
  BranchControl: TreeViewBranchControl,
  BranchTrigger: TreeViewBranchTrigger,
  BranchIndicator: TreeViewBranchIndicator,
  BranchText: TreeViewBranchText,
}

export {
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewBranchTrigger,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewRoot,
  TreeViewTree,
  useTreeViewContext,
}
export type {
  TreeViewBranchContentProps,
  TreeViewBranchControlProps,
  TreeViewBranchIndicatorProps,
  TreeViewBranchProps,
  TreeViewBranchTextProps,
  TreeViewBranchTriggerProps,
  TreeViewContext,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewItemProps,
  TreeViewItemTextProps,
  TreeViewLabelProps,
  TreeViewRootProps,
  TreeViewSelectionChangeDetails,
  TreeViewTreeProps,
}

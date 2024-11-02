import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps<T extends TreeNode>
  extends UseTreeViewProps<T>,
    PolymorphicProps {}
export interface TreeViewRootProps<T extends TreeNode>
  extends HTMLProps<'div'>,
    TreeViewRootBaseProps<T> {}

const TreeViewImpl = <T extends TreeNode>(
  props: TreeViewRootProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps<T>>()(props, [
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
  ])

  const treeView = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <ark.div {...mergedProps} ref={ref} />
    </TreeViewProvider>
  )
}

export type TreeViewComponent = <T extends TreeNode>(
  props: TreeViewRootProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const TreeViewRoot = forwardRef(TreeViewImpl) as TreeViewComponent

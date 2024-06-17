import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps extends UseTreeViewProps, PolymorphicProps {}
export interface TreeViewRootProps extends HTMLAttributes<HTMLDivElement>, TreeViewRootBaseProps {}

export const TreeViewRoot = forwardRef<HTMLDivElement, TreeViewRootProps>((props, ref) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps>()(props, [
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
})

TreeViewRoot.displayName = 'TreeViewRoot'

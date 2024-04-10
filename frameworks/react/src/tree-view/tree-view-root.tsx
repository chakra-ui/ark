import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeView, type UseTreeViewProps } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootProps extends Assign<HTMLArkProps<'div'>, UseTreeViewProps> {}

export const TreeViewRoot = forwardRef<HTMLDivElement, TreeViewRootProps>((props, ref) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps>()(props, [
    'defaultExpandedIds',
    'defaultSelectedIds',
    'dir',
    'expandedIds',
    'focusedId',
    'getRootNode',
    'id',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'openOnClick',
    'selectedIds',
    'selectionMode',
  ])
  const treeView = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(treeView.rootProps, localProps)

  return (
    <TreeViewProvider value={treeView}>
      <ark.div {...mergedProps} ref={ref} />
    </TreeViewProvider>
  )
})

TreeViewRoot.displayName = 'TreeViewRoot'

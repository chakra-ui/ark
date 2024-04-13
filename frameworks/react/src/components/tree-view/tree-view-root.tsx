import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
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

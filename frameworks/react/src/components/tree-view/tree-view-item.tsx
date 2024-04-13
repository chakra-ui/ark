import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { createSplitProps } from '~/utils/create-split-props'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider } from './use-tree-view-item-context'
import {
  TreeViewItemPropsProvider,
  type UseTreeViewItemPropsContext,
} from './use-tree-view-item-props-context'

export interface TreeViewItemProps
  extends Assign<HTMLArkProps<'li'>, UseTreeViewItemPropsContext> {}

export const TreeViewItem = forwardRef<HTMLLIElement, TreeViewItemProps>((props, ref) => {
  const [{ id, disabled }, localProps] = createSplitProps<UseTreeViewItemPropsContext>()(props, [
    'id',
    'disabled',
  ])
  const treeView = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = { id, disabled, depth }
  const mergedProps = mergeProps(treeView.getItemProps(itemProps), localProps)
  const itemState = treeView.getItemState(itemProps)

  return (
    <TreeViewItemPropsProvider value={itemProps}>
      <TreeViewItemProvider value={itemState}>
        <ark.li {...mergedProps} ref={ref} />
      </TreeViewItemProvider>
    </TreeViewItemPropsProvider>
  )
})

TreeViewItem.displayName = 'TreeViewItem'

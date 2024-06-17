import { mergeProps } from '@zag-js/react'
import { type LiHTMLAttributes, forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider } from './use-tree-view-item-context'
import {
  TreeViewItemPropsProvider,
  type UseTreeViewItemPropsContext,
} from './use-tree-view-item-props-context'

export interface TreeViewItemBaseProps extends UseTreeViewItemPropsContext, PolymorphicProps {}
export interface TreeViewItemProps
  extends Assign<LiHTMLAttributes<HTMLLIElement>, TreeViewItemBaseProps> {}

export const TreeViewItem = forwardRef<HTMLLIElement, TreeViewItemProps>((props, ref) => {
  const [{ value, disabled }, localProps] = createSplitProps<UseTreeViewItemPropsContext>()(props, [
    'disabled',
    'value',
  ])
  const treeView = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = { value, disabled, depth }
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

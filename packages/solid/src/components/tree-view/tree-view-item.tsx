import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider } from './use-tree-view-item-context'
import {
  TreeViewItemPropsProvider,
  type UseTreeViewItemPropsContext,
} from './use-tree-view-item-props-context'

export interface TreeViewItemProps
  extends Assign<HTMLArkProps<'li'>, UseTreeViewItemPropsContext> {}

export const TreeViewItem = (props: TreeViewItemProps) => {
  const [_itemProps, localProps] = createSplitProps<UseTreeViewItemPropsContext>()(props, [
    'disabled',
    'value',
  ])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = mergeProps(_itemProps, { depth })
  const itemState = createMemo(() => api().getItemState(itemProps))
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <TreeViewItemPropsProvider value={itemProps}>
      <TreeViewItemProvider value={itemState}>
        <ark.li {...mergedProps} />
      </TreeViewItemProvider>
    </TreeViewItemPropsProvider>
  )
}

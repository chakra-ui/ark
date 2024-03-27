import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider, type ItemProps } from './use-tree-view-item-context'

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewItem = (props: TreeViewItemProps) => {
  const [_itemProps, localProps] = createSplitProps<ItemProps>()(props, ['id', 'disabled'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = mergeProps(_itemProps, { depth })
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return (
    <TreeViewItemProvider value={itemProps}>
      <ark.li {...mergedProps} />
    </TreeViewItemProvider>
  )
}

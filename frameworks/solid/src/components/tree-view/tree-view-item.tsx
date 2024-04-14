import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { type ItemProps, TreeViewItemProvider } from './use-tree-view-item-context'

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

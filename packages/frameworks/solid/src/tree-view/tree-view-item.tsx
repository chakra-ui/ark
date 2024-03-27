import { mergeProps } from '@zag-js/solid'
import type { ItemState } from '@zag-js/tree-view'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewDepthContext } from './tree-view-depth-context'
import { TreeViewItemProvider, type ItemProps } from './tree-view-item-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewItem = (props: TreeViewItemProps) => {
  const [_itemProps, localProps] = createSplitProps<ItemProps>()(props, ['id', 'disabled'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = mergeProps(_itemProps, { depth })
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <TreeViewItemProvider value={itemProps}>
      <ark.li {...mergedProps}>{getChildren()}</ark.li>
    </TreeViewItemProvider>
  )
}

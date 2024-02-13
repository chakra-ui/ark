import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemState } from './tree-view-context'
import { useTreeViewDepthContext } from './tree-view-depth-context'
import { TreeViewItemProvider, type ItemProps } from './tree-view-item-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewItem: ArkComponent<'li', ElementProps> = (props: TreeViewItemProps) => {
  const [foo, localProps] = createSplitProps<ItemProps>()(props, ['id', 'disabled'])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = mergeProps(foo, { depth })
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return (
    <TreeViewItemProvider value={itemProps}>
      <ark.li {...mergedProps}>{getChildren()}</ark.li>
    </TreeViewItemProvider>
  )
}

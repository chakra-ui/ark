// import type { ItemProps, ItemState } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps, type ItemState } from './tree-view-context'

interface ElementProps extends ItemProps {
  children?: JSX.Element | ((state: Accessor<ItemState>) => JSX.Element)
}

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ElementProps> {}

export const TreeViewItem: ArkComponent<'li', ElementProps> = (props: TreeViewItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['depth', 'id', 'disabled'])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)
  const getChildren = () => runIfFn(localProps.children, () => api().getItemState(itemProps))

  return <ark.li {...mergedProps}>{getChildren()}</ark.li>
}

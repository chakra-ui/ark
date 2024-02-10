// import type { ItemProps, ItemState } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps, type ItemState } from './tree-view-context'

export interface TreeViewItemProps
  extends Assign<
    Assign<
      HTMLArkProps<'li'>,
      {
        children?: ReactNode | ((state: ItemState) => ReactNode)
      }
    >,
    ItemProps
  > {}

export const TreeViewItem = forwardRef<HTMLLIElement, TreeViewItemProps>((props, ref) => {
  const [itemProps, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)
  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <ark.li {...mergedProps} ref={ref}>
      {view}
    </ark.li>
  )
})

TreeViewItem.displayName = 'TreeViewItem'

import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemState } from './tree-view-context'
import { useTreeViewDepthContext } from './tree-view-depth-context'
import { TreeViewItemProvider, type ItemProps } from './tree-view-item-context'

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
  const [{ id, disabled }, { children, ...localProps }] = createSplitProps<ItemProps>()(props, [
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = { id, disabled, depth }
  const mergedProps = mergeProps(api.getItemProps(itemProps), localProps)

  const itemState = api.getItemState(itemProps)
  const view = runIfFn(children, itemState)

  return (
    <TreeViewItemProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref}>
        {view}
      </ark.li>
    </TreeViewItemProvider>
  )
})

TreeViewItem.displayName = 'TreeViewItem'

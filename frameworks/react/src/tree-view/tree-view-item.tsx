import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider, type ItemProps } from './use-tree-view-item-context'

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewItem = forwardRef<HTMLLIElement, TreeViewItemProps>((props, ref) => {
  const [{ id, disabled }, localProps] = createSplitProps<ItemProps>()(props, ['id', 'disabled'])
  const context = useTreeViewContext()
  const depth = useTreeViewDepthContext()
  const itemProps = { id, disabled, depth }
  const mergedProps = mergeProps(context.getItemProps(itemProps), localProps)

  return (
    <TreeViewItemProvider value={itemProps}>
      <ark.li {...mergedProps} ref={ref} />
    </TreeViewItemProvider>
  )
})

TreeViewItem.displayName = 'TreeViewItem'

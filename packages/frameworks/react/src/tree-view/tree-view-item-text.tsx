import { treeViewAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps } from './tree-view-context'

export interface TreeViewItemTextProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['depth', 'id', 'disabled'])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(
    api.getItemProps(itemProps),
    treeViewAnatomy.build().itemText.attrs as Record<string, string>,
    localProps,
  )

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

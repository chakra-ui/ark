import { treeViewAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewItemContext } from './tree-view-item-context'

export interface TreeViewItemTextProps extends HTMLArkProps<'span'> {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemContext()
  const mergedProps = mergeProps(
    api.getItemProps(itemProps),
    treeViewAnatomy.build().itemText.attrs as Record<string, string>,
    props,
  )

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

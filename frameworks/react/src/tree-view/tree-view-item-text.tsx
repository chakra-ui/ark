import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemTextProps extends HTMLArkProps<'span'> {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const context = useTreeViewContext()
  const itemContext = useTreeViewItemContext()
  const mergedProps = mergeProps(context.getItemTextProps(itemContext), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

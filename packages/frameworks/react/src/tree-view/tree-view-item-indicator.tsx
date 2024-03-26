import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewItemIndicator = forwardRef<HTMLDivElement, TreeViewItemIndicatorProps>(
  (props, ref) => {
    const context = useTreeViewContext()
    const itemContext = useTreeViewItemContext()
    const mergedProps = mergeProps(context.getItemIndicatorProps(itemContext), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'

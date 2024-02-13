import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewItemContext } from './tree-view-item-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'span'> {}

export const TreeViewItemIndicator = forwardRef<HTMLSpanElement, TreeViewItemIndicatorProps>(
  (props, ref) => {
    const api = useTreeViewContext()
    const itemProps = useTreeViewItemContext()
    const mergedProps = mergeProps(api.getItemIndicatorProps(itemProps), props)

    return <ark.span {...mergedProps} ref={ref} />
  },
)

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'

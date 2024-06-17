import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewItemIndicatorProps
  extends HTMLAttributes<HTMLDivElement>,
    TreeViewItemIndicatorBaseProps {}

export const TreeViewItemIndicator = forwardRef<HTMLDivElement, TreeViewItemIndicatorProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const itemProps = useTreeViewItemPropsContext()
    const mergedProps = mergeProps(treeView.getItemIndicatorProps(itemProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'

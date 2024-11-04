import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewBranchIndicatorProps
  extends HTMLProps<'div'>,
    TreeViewBranchIndicatorBaseProps {}

export const TreeViewBranchIndicator = forwardRef<HTMLDivElement, TreeViewBranchIndicatorProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const nodeProps = useTreeViewNodePropsContext()
    const mergedProps = mergeProps(treeView.getBranchIndicatorProps(nodeProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchIndicator.displayName = 'TreeViewBranchIndicator'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchTriggerBaseProps extends PolymorphicProps {}
export interface TreeViewBranchTriggerProps
  extends HTMLProps<'div'>,
    TreeViewBranchTriggerBaseProps {}

export const TreeViewBranchTrigger = forwardRef<HTMLDivElement, TreeViewBranchTriggerProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const nodeProps = useTreeViewNodePropsContext()
    const mergedProps = mergeProps(treeView.getBranchTriggerProps(nodeProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchTrigger.displayName = 'TreeViewBranchTrigger'

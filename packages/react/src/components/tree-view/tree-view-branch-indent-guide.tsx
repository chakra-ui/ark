import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchIndentGuideBaseProps extends PolymorphicProps {}
export interface TreeViewBranchIndentGuideProps
  extends HTMLProps<'div'>,
    TreeViewBranchIndentGuideBaseProps {}

export const TreeViewBranchIndentGuide = forwardRef<HTMLDivElement, TreeViewBranchIndentGuideProps>(
  (props, ref) => {
    const treeView = useTreeViewContext()
    const nodeProps = useTreeViewNodePropsContext()
    const mergedProps = mergeProps(treeView.getBranchIndentGuideProps(nodeProps), props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

TreeViewBranchIndentGuide.displayName = 'TreeViewBranchIndentGuide'

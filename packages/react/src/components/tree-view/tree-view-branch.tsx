import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import {
  TreeViewNodePropsProvider,
  useTreeViewNodePropsContext,
} from './use-tree-view-node-props-context'

export interface TreeViewBranchBaseProps extends PolymorphicProps {}
export interface TreeViewBranchProps extends Assign<HTMLProps<'div'>, TreeViewBranchBaseProps> {}

export const TreeViewBranch = forwardRef<HTMLDivElement, TreeViewBranchProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getBranchProps(nodeProps), props)

  return (
    <TreeViewNodePropsProvider value={nodeProps}>
      <ark.div {...mergedProps} ref={ref} />
    </TreeViewNodePropsProvider>
  )
})

TreeViewBranch.displayName = 'TreeViewBranch'

import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchTextBaseProps extends PolymorphicProps<'span'> {}
export interface TreeViewBranchTextProps
  extends JSX.HTMLAttributes<HTMLSpanElement>,
    TreeViewBranchTextBaseProps {}

export const TreeViewBranchText = (props: TreeViewBranchTextProps) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchTextProps(branchProps), props)

  return <ark.span {...mergedProps} />
}

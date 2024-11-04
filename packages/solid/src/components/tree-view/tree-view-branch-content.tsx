import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { Collapsible } from '../collapsible'
import type { HTMLProps, PolymorphicProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewBranchContentBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchContentProps
  extends HTMLProps<'div'>,
    TreeViewBranchContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const TreeViewBranchContent = (props: TreeViewBranchContentProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const branchContentProps = createMemo(() => {
    const contentProps = treeView().getBranchContentProps(nodeProps)
    const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, [
      'hidden',
      'data-state',
    ])
    return ownProps
  })
  const mergedProps = mergeProps(() => branchContentProps(), props)

  return <Collapsible.Content {...mergedProps} />
}

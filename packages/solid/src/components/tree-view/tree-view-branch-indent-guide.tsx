import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewBranchIndentGuideBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewBranchIndentGuideProps extends HTMLProps<'div'>, TreeViewBranchIndentGuideBaseProps {}

export const TreeViewBranchIndentGuide = (props: TreeViewBranchIndentGuideProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getBranchIndentGuideProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}

import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewIndentGuideBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewIndentGuideProps extends HTMLProps<'div'>, TreeViewIndentGuideBaseProps {}

export const TreeViewIndentGuide = (props: TreeViewIndentGuideProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(() => treeView().getIndentGuideProps(nodeProps), props)

  return <ark.div {...mergedProps} />
}

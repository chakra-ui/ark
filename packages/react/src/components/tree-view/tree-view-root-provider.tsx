import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

interface RootProviderProps<T extends TreeNode> {
  value: UseTreeViewReturn<T>
}
export interface TreeViewRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>,
    PolymorphicProps {}
export interface TreeViewRootProviderProps<T extends TreeNode>
  extends HTMLProps<'div'>,
    TreeViewRootProviderBaseProps<T> {}

const TreeViewImpl = <T extends TreeNode>(
  props: TreeViewRootProviderProps<T>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const [{ value: treeView }, localProps] = createSplitProps<RootProviderProps<T>>()(props, [
    'value',
  ])
  const mergedProps = mergeProps(treeView.getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <ark.div {...mergedProps} ref={ref} />
    </TreeViewProvider>
  )
}

export type TreeViewComponent = <T extends TreeNode>(
  props: TreeViewRootProviderProps<T> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element

export const TreeViewRootProvider = forwardRef(TreeViewImpl) as TreeViewComponent

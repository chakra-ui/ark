import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import {
  type RenderStrategyProps,
  RenderStrategyProvider,
  splitRenderStrategyProps,
} from '../../utils/render-strategy'
import type { TreeNode } from '../collection'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

interface RootProviderProps<T extends TreeNode> {
  value: UseTreeViewReturn<T>
}
export interface TreeViewRootProviderBaseProps<T extends TreeNode>
  extends RootProviderProps<T>,
    RenderStrategyProps,
    PolymorphicProps<'div'> {}
export interface TreeViewRootProviderProps<T extends TreeNode>
  extends HTMLProps<'div'>,
    TreeViewRootProviderBaseProps<T> {}

export const TreeViewRootProvider = <T extends TreeNode>(props: TreeViewRootProviderProps<T>) => {
  const [renderStrategyProps, treeViewProps] = splitRenderStrategyProps(props)
  const [{ value: treeView }, localProps] = createSplitProps<RootProviderProps<T>>()(
    treeViewProps,
    ['value'],
  )
  const mergedProps = mergeProps(() => treeView().getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <ark.div {...mergedProps} />
      </RenderStrategyProvider>
    </TreeViewProvider>
  )
}

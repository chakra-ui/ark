import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTreeViewReturn } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

interface RootProviderProps {
  value: UseTreeViewReturn
}

export interface TreeViewRootProviderBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewRootProviderProps
  extends HTMLProps<'div'>,
    RootProviderProps,
    TreeViewRootProviderBaseProps {}

export const TreeViewRootProvider = (props: TreeViewRootProviderProps) => {
  const [{ value: treeView }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => treeView().getRootProps(), localProps)

  return (
    <TreeViewProvider value={treeView}>
      <ark.div {...mergedProps} />
    </TreeViewProvider>
  )
}

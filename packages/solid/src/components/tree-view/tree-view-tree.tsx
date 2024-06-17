import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider } from './use-tree-view-depth-context'

export interface TreeViewTreeBaseProps extends PolymorphicProps<'ul'> {}
export interface TreeViewTreeProps
  extends JSX.HTMLAttributes<HTMLUListElement>,
    TreeViewTreeBaseProps {}

export const TreeViewTree = (props: TreeViewTreeProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getTreeProps(), props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} />
    </TreeViewDepthProvider>
  )
}

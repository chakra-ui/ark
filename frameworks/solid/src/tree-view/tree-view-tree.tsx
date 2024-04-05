import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider } from './use-tree-view-depth-context'

export interface TreeViewTreeProps extends HTMLArkProps<'ul'> {}

export const TreeViewTree = (props: TreeViewTreeProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().treeProps, props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} />
    </TreeViewDepthProvider>
  )
}

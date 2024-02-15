import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider } from './tree-view-depth-context'

export interface TreeViewTreeProps extends HTMLArkProps<'ul'> {}

export const TreeViewTree: ArkComponent<'ul'> = (props: TreeViewTreeProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().treeProps, props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} />
    </TreeViewDepthProvider>
  )
}

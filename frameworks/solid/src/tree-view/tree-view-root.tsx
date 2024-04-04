import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeView, type UseTreeViewProps } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootProps extends Assign<HTMLArkProps<'div'>, UseTreeViewProps> {}

export const TreeViewRoot = (props: TreeViewRootProps) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps>()(props, [
    'dir',
    'expandedIds',
    'focusedId',
    'getRootNode',
    'id',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'openOnClick',
    'selectedIds',
    'selectionMode',
  ])
  const api = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <TreeViewProvider value={api}>
      <ark.div {...mergedProps()} />
    </TreeViewProvider>
  )
}

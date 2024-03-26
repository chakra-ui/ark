import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { TreeViewProvider } from './tree-view-context'
import { useTreeView, type UseTreeViewProps, type UseTreeViewReturn } from './use-tree-view'

interface ElementProps extends UseTreeViewProps {
  children?: JSX.Element | ((api: UseTreeViewReturn) => JSX.Element)
}
export interface TreeViewRootProps extends Assign<HTMLArkProps<'div'>, ElementProps> {}

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
  const getChildren = () => runIfFn(localProps.children, api)

  return (
    <TreeViewProvider value={api}>
      <ark.div {...mergedProps}>{getChildren()}</ark.div>
    </TreeViewProvider>
  )
}

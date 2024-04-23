import { mergeProps } from '@zag-js/solid'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootProps extends Assign<HTMLArkProps<'div'>, UseTreeViewProps> {}

export const TreeViewRoot = (props: TreeViewRootProps) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps>()(props, [
    'dir',
    'expandedValue',
    'focusedValue',
    'getRootNode',
    'id',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'openOnClick',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ])
  const api = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(() => api().rootProps, localProps)

  return (
    <TreeViewProvider value={api}>
      <ark.div {...mergedProps} />
    </TreeViewProvider>
  )
}

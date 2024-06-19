import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTreeViewProps, useTreeView } from './use-tree-view'
import { TreeViewProvider } from './use-tree-view-context'

export interface TreeViewRootBaseProps extends UseTreeViewProps, PolymorphicProps<'div'> {}
export interface TreeViewRootProps extends HTMLProps<'div'>, TreeViewRootBaseProps {}

export const TreeViewRoot = (props: TreeViewRootProps) => {
  const [useTreeViewProps, localProps] = createSplitProps<UseTreeViewProps>()(props, [
    'defaultExpandedValue',
    'defaultSelectedValue',
    'expandedValue',
    'expandOnClick',
    'focusedValue',
    'id',
    'ids',
    'onExpandedChange',
    'onFocusChange',
    'onSelectionChange',
    'selectedValue',
    'selectionMode',
    'typeahead',
  ])
  const api = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(() => api().getRootProps(), localProps)

  return (
    <TreeViewProvider value={api}>
      <ark.div {...mergedProps} />
    </TreeViewProvider>
  )
}

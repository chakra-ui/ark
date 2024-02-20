import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { TreeViewProvider } from './tree-view-context'
import { useTreeView, type UseTreeViewProps, type UseTreeViewReturn } from './use-tree-view'

export interface TreeViewRootProps
  extends Assign<
    Assign<
      HTMLArkProps<'div'>,
      {
        children?: ReactNode | ((api: UseTreeViewReturn) => ReactNode)
      }
    >,
    UseTreeViewProps
  > {}

export const TreeViewRoot = forwardRef<HTMLDivElement, TreeViewRootProps>((props, ref) => {
  const [useTreeViewProps, { children, ...localProps }] = createSplitProps<UseTreeViewProps>()(
    props,
    [
      'defaultSelectedIds',
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
    ],
  )
  const api = useTreeView(useTreeViewProps)
  const mergedProps = mergeProps(api.rootProps, localProps)

  const view = runIfFn(children, api)

  return (
    <TreeViewProvider value={api}>
      <ark.div {...mergedProps} ref={ref}>
        {view}
      </ark.div>
    </TreeViewProvider>
  )
})

TreeViewRoot.displayName = 'TreeViewRoot'

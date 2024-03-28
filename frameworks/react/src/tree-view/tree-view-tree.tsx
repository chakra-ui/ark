import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider } from './use-tree-view-depth-context'

export interface TreeViewTreeProps extends HTMLArkProps<'ul'> {}

export const TreeViewTree = forwardRef<HTMLUListElement, TreeViewTreeProps>((props, ref) => {
  const context = useTreeViewContext()
  const mergedProps = mergeProps(context.treeProps, props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} ref={ref} />
    </TreeViewDepthProvider>
  )
})

TreeViewTree.displayName = 'TreeViewTree'

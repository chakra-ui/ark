import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider } from './tree-view-depth-context'

export interface TreeViewTreeProps extends HTMLArkProps<'ul'> {}

export const TreeViewTree = forwardRef<HTMLUListElement, TreeViewTreeProps>((props, ref) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(api.treeProps, props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} ref={ref} />
    </TreeViewDepthProvider>
  )
})

TreeViewTree.displayName = 'TreeViewTree'

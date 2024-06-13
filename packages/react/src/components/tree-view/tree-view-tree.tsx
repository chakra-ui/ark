import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider } from './use-tree-view-depth-context'

export type TreeViewTreeBaseProps = {}
export interface TreeViewTreeProps extends HTMLArkProps<'ul'>, TreeViewTreeBaseProps {}

export const TreeViewTree = forwardRef<HTMLUListElement, TreeViewTreeProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return (
    <TreeViewDepthProvider value={1}>
      <ark.ul {...mergedProps} ref={ref} />
    </TreeViewDepthProvider>
  )
})

TreeViewTree.displayName = 'TreeViewTree'

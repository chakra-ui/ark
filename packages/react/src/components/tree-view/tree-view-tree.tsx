import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewTreeBaseProps extends PolymorphicProps {}
export interface TreeViewTreeProps extends HTMLProps<'div'>, TreeViewTreeBaseProps {}

export const TreeViewTree = forwardRef<HTMLDivElement, TreeViewTreeProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getTreeProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewTree.displayName = 'TreeViewTree'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewItemTextBaseProps extends PolymorphicProps {}
export interface TreeViewItemTextProps extends HTMLProps<'span'>, TreeViewItemTextBaseProps {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(nodeProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

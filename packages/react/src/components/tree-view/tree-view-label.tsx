import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps extends HTMLProps<'h3'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = forwardRef<HTMLHeadingElement, TreeViewLabelProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <ark.h3 {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'

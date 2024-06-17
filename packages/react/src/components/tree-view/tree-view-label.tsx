import { mergeProps } from '@zag-js/react'
import { type LabelHTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelBaseProps extends PolymorphicProps {}
export interface TreeViewLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    TreeViewLabelBaseProps {}

export const TreeViewLabel = forwardRef<HTMLLabelElement, TreeViewLabelProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'

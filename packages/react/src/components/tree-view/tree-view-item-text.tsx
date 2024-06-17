import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemTextBaseProps extends PolymorphicProps {}
export interface TreeViewItemTextProps
  extends HTMLAttributes<HTMLSpanElement>,
    TreeViewItemTextBaseProps {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const itemProps = useTreeViewItemPropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

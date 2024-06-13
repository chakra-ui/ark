import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export type TreeViewItemTextBaseProps = {}
export interface TreeViewItemTextProps extends HTMLArkProps<'span'>, TreeViewItemTextBaseProps {}

export const TreeViewItemText = forwardRef<HTMLSpanElement, TreeViewItemTextProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const itemProps = useTreeViewItemPropsContext()
  const mergedProps = mergeProps(treeView.getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewItemText.displayName = 'TreeViewItemText'

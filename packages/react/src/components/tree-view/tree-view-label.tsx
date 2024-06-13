import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export type TreeViewLabelBaseProps = {}
export interface TreeViewLabelProps extends HTMLArkProps<'label'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = forwardRef<HTMLLabelElement, TreeViewLabelProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const mergedProps = mergeProps(treeView.getLabelProps(), props)

  return <ark.label {...mergedProps} ref={ref} />
})

TreeViewLabel.displayName = 'TreeViewLabel'

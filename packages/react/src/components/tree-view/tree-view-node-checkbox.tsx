import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewNodeCheckboxBaseProps extends PolymorphicProps {}
export interface TreeViewNodeCheckboxProps extends HTMLProps<'span'>, TreeViewNodeCheckboxBaseProps {}

export const TreeViewNodeCheckbox = forwardRef<HTMLSpanElement, TreeViewNodeCheckboxProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemCheckboxProps(nodeProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewNodeCheckbox.displayName = 'TreeViewNodeCheckbox'

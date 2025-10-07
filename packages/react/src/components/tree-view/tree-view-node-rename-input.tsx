import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps {}
export interface TreeViewNodeRenameInputProps extends Assign<HTMLProps<'input'>, TreeViewNodeRenameInputBaseProps> {}

export const TreeViewNodeRenameInput = forwardRef<HTMLInputElement, TreeViewNodeRenameInputProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeRenameInputProps(nodeProps), props)

  return <ark.input {...mergedProps} ref={ref} />
})

TreeViewNodeRenameInput.displayName = 'TreeViewNodeRenameInput'

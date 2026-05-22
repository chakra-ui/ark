'use client'

import { mergeProps } from '@zag-js/react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context'

export interface TreeViewNodeRenameInputBaseProps extends PolymorphicProps {}
export interface TreeViewNodeRenameInputProps extends Assign<HTMLProps<'input'>, TreeViewNodeRenameInputBaseProps> {}

export const TreeViewNodeRenameInput = ({ ref, ...props }: TreeViewNodeRenameInputProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeRenameInputProps(nodeProps), props)

  return <ark.input {...mergedProps} ref={ref} />
}

TreeViewNodeRenameInput.displayName = 'TreeViewNodeRenameInput'

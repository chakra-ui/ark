'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewCellBaseProps extends PolymorphicProps {}
export interface TreeViewCellProps extends HTMLProps<'div'>, TreeViewCellBaseProps {}

export const TreeViewCell = forwardRef<HTMLDivElement, TreeViewCellProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getCellProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewCell.displayName = 'TreeViewCell'

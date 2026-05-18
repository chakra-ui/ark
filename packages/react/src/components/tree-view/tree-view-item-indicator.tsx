'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps {}
export interface TreeViewItemIndicatorProps extends HTMLProps<'div'>, TreeViewItemIndicatorBaseProps {}

export const TreeViewItemIndicator = forwardRef<HTMLDivElement, TreeViewItemIndicatorProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getItemIndicatorProps(nodeProps), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewItemIndicator.displayName = 'TreeViewItemIndicator'

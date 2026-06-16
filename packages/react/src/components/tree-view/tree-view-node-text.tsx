'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeTextBaseProps extends PolymorphicProps {}
export interface TreeViewNodeTextProps extends HTMLProps<'span'>, TreeViewNodeTextBaseProps {}

export const TreeViewNodeText = forwardRef<HTMLSpanElement, TreeViewNodeTextProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeTextProps(nodeProps), props)

  return <ark.span {...mergedProps} ref={ref} />
})

TreeViewNodeText.displayName = 'TreeViewNodeText'

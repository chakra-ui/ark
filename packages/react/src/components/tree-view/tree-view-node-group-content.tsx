'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { Collapsible } from '../collapsible/index.ts'
import type { HTMLProps, PolymorphicProps } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeGroupContentBaseProps extends PolymorphicProps {}
export interface TreeViewNodeGroupContentProps extends HTMLProps<'div'>, TreeViewNodeGroupContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean | undefined
  'data-state'?: string | undefined
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const TreeViewNodeGroupContent = forwardRef<HTMLDivElement, TreeViewNodeGroupContentProps>((props, ref) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const contentProps = treeView.getNodeGroupContentProps(nodeProps)

  const [, nodeGroupContentProps] = splitVisibilityProps(contentProps, ['hidden', 'data-state'])
  const mergedProps = mergeProps(nodeGroupContentProps, props)

  return <Collapsible.Content ref={ref} {...mergedProps} />
})

TreeViewNodeGroupContent.displayName = 'TreeViewNodeGroupContent'
